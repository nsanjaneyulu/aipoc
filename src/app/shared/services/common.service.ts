import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlobServiceClient } from '@azure/storage-blob';
import Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isExpandableSubject$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isExpandable$ = this.isExpandableSubject$.asObservable();
  globalSearch$ = new BehaviorSubject<string>('');
  isListViewData$ = new BehaviorSubject<boolean>(true);

  async convertCsvToJson(
    blobName: string
  ): Promise<any> {
    const blobClient = this.getBlobClient(blobName);

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

      if (result.errors.length) {
        throw new Error(result.errors.map((e) => e.message).join(', '));
      }

      const jsonArray = (result.data as { [key: string]: any }[]).map(
        (row: { [key: string]: any }) => {
          const formattedRow: { [key: string]: any } = {};
          for (const [columnName, value] of Object.entries(row)) {
            if (columnName.endsWith('CSV')) {
              formattedRow[columnName] = value
                ? value.split('|').map((v: string) => v.trim())
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

  private getBlobClient(blobName: string) {
    const blobServiceClient = new BlobServiceClient(
      `https://${Constant.storageAccount}.blob.core.windows.net`
    );

    const containerClient = blobServiceClient.getContainerClient(Constant.containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    return blobClient;
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
