import { inject, Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { BlobServiceClient } from '@azure/storage-blob';
import * as Papa from 'papaparse';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesosnService {
  private commonService: CommonService = inject(CommonService);
  industries: any;
  private industriesArraySubject = new Subject<any>();
  technologies$ = this.industriesArraySubject.asObservable();
  constructor() {}

 async csvToJsonConverter(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.industries) {
      return Promise.resolve(this.industries);
    } else {
      this.industries = await this.commonService.convertCsvToJson(
        blobName
      );

      return this.industries;
    }

  }
}
