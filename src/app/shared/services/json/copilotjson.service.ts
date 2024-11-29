import { inject, Injectable } from '@angular/core';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root',
})
export class CopilotjsonService {
  private commonService: CommonService = inject(CommonService);
  jsonArray: any;
  carouselJsonArray: any;
  constructor() {}

  async csvToJsonConverter(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.jsonArray) {
      return Promise.resolve(this.jsonArray);
    } else {
      this.jsonArray = await this.commonService.convertCsvToJson(
        StorageAccount,
        containerName,
        blobName
      );
      return this.jsonArray;
    }
  }

  async csvToJsonConverterCarousel(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.carouselJsonArray) {
      return Promise.resolve(this.carouselJsonArray);
    } else {
      this.carouselJsonArray = await this.commonService.convertCsvToJson(
        StorageAccount,
        containerName,
        blobName
      );

      return this.carouselJsonArray;
    }
  }
}
