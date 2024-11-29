import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { Subject } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class JsonconverterService {
 // jsonArray: any;
  industries:any;
 // private jsonArraySubject = new Subject<any>();
  private industriesArraySubject = new Subject<any>();
  industries$ = this.industriesArraySubject.asObservable();
  
  private technologiesArraySubject = new Subject<any>();
  technologies$ = this.industriesArraySubject.asObservable();
  
    constructor() {
      this.csvToJsonConverter( 'delphiunprodgitexailib', 'delphi-ai-library', 'Configurations/industries.csv')
    }

    csvToJsonConverter(StorageAccount:string, containerName: string, blobName:string){
      this.convertCsvToJson(
        StorageAccount,
        containerName,
        blobName
      )
        .then((jsonArray) => {
          this.industries = jsonArray;
          this.industriesArraySubject.next(this.industries);
        })
        .catch((error) => {
          console.error(error);
        });
  
        // this.convertCsvToJson(
        //   'delphiunprodgitexailib',
        //   'delphi-ai-library',
        //   'MasterTechnology/Master_Technologies.csv'
        // )
        //   .then((jsonArray) => {
        //     this.industries = jsonArray;
        //     this.technologiesArraySubject.next(this.industries);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
  
    async convertCsvToJson(
      storageAccount: string,
      containerName: string,
      blobName: string
    ): Promise<any> {
      const blobServiceClient = new BlobServiceClient(
        `https://${storageAccount}.blob.core.windows.net`
      );
  
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(blobName);
  
      const downloadBlockBlobResponse = await blobClient.download();
      const blob = (await downloadBlockBlobResponse.blobBody) || null;
  
      if (!blob) {
        throw new Error('Failed to get blob from download response');
      }
  
      const downloaded = await this.blobToString(blob);
  
      try {
        const result = Papa.parse(downloaded, {
          header: true,
          skipEmptyLines: true,
        });
  
        if (!result.errors.length) {
          throw new Error(result.errors.map((e) => e.message).join(', '));
        }
  
        const jsonArray = (result.data as { [key: string]: any }[]).map(
          (row: { [key: string]: any }) => {
            const formattedRow: { [key: string]: any } = {};
            for (const [columnName, value] of Object.entries(row)) {
              if (columnName.endsWith('CSV')) {
                formattedRow[columnName] = value
                  ? value.split(',').map((v: string) => v.trim())
                  : [];
              } else {
                formattedRow[columnName] = value ? value.trim() : '';
              }
            }
            return formattedRow;
          }
        );
  
        return jsonArray;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to parse CSV: ${errorMessage}`);
      }
    }
  
    private async blobToString(blob: Blob): Promise<string> {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
          if (ev.target && typeof ev.target.result === 'string') {
            resolve(ev.target.result);
          } else {
            reject(new Error('Failed to read blob as text'));
          }
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
      });
    }
    
}
