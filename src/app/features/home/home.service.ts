import { inject, Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private commonService: CommonService = inject(CommonService);
  carouselJsonArray: any;
  clientJsonArray: any;
  statisTicsJsonArray: any;
  constructor() {}

  async csvToJsonConverter(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.carouselJsonArray) {
      return Promise.resolve(this.carouselJsonArray);
    } else {
      this.carouselJsonArray = await this.commonService.convertCsvToJson(
        blobName
      );
      return this.carouselJsonArray;
    }
  }

  async csvToJsonConverterStatistics(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.statisTicsJsonArray) {
      return Promise.resolve(this.statisTicsJsonArray);
    } else {
      this.statisTicsJsonArray = await this.commonService.convertCsvToJson(
        blobName
      );
      return this.statisTicsJsonArray;
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
        blobName
      );

      return this.carouselJsonArray;
    }
  }

  async csvToJsonConverterClients(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.clientJsonArray) {
      return Promise.resolve(this.clientJsonArray);
    } else {
      this.clientJsonArray = await this.commonService.convertCsvToJson(
        blobName
      );

      return this.clientJsonArray;
    }
  }
}
