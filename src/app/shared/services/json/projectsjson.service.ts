import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BlobServiceClient } from '@azure/storage-blob';
import * as Papa from 'papaparse';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsjsonService {
  private commonService: CommonService = inject(CommonService);
  jsonArray: any;
  jsonArrayProjectType: any;
  private projectArraySubject = new Subject<any>();
  projects$ = this.projectArraySubject.asObservable();
  constructor() {}

  async csvToJsonConverter(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.jsonArray) {
      return Promise.resolve(this.jsonArray);
    } else {
      this.jsonArray = await this.commonService.convertCsvToJson(blobName);

      return this.jsonArray;
    }
  }

  async csvToJsonConverterProjectType(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.jsonArrayProjectType) {
      return Promise.resolve(this.jsonArrayProjectType);
    } else {
      this.jsonArrayProjectType = await this.commonService.convertCsvToJson(
        blobName
      );

      return this.jsonArrayProjectType;
    }
  }
}
