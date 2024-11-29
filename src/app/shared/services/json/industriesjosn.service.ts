import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class IndustriesjosnService {
  private commonService : CommonService = inject(CommonService)
  jsonArray:any
  private industriesArraySubject = new Subject<any>();
  industries$ = this.industriesArraySubject.asObservable();
  constructor() {
    this.csvToJsonConverter( 'delphiunprodgitexailib', 'delphi-ai-library', 'Configurations/industries.csv')
  }

  // csvToJsonConverter(StorageAccount:string, containerName: string, blobName:string){
  //   this.commonService.convertCsvToJson(
  //     StorageAccount,
  //     containerName,
  //     blobName
  //   )
  //     .then((jsonArray) => {
  //       this.jsonArray = jsonArray;
  //       this.industriesArraySubject.next(this.jsonArray);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   }


    async csvToJsonConverter(
      StorageAccount: string,
      containerName: string,
      blobName: string
    ): Promise<any> {
      if (this.jsonArray) {
        return Promise.resolve(this.jsonArray);
      } else {
        this.jsonArray = await this.commonService.convertCsvToJson(
          blobName
        );

        return this.jsonArray;
      }

    }





}
