import { inject, Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class CopilotService {
  private commonService: CommonService = inject(CommonService);
  jsonArray: any;
  carouselJsonArray: any;
  copilotOffringJsonArray: any;
  copilotUsecaseJsonArray: any;

  constructor() {}

  // async csvToJsonConverter(
  //   StorageAccount: string,
  //   containerName: string,
  //   blobName: string
  // ): Promise<any> {
  //   if (this.jsonArray) {
  //     return Promise.resolve(this.jsonArray);
  //   } else {
  //     this.jsonArray = await this.commonService.convertCsvToJson(
  //       StorageAccount,
  //       containerName,
  //       blobName
  //     );
  //     return this.jsonArray;
  //   }
  // }

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

  async csvToJsonConverterCopilotOffering(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.copilotOffringJsonArray) {
      return Promise.resolve(this.copilotOffringJsonArray);
    } else {
      this.copilotOffringJsonArray = await this.commonService.convertCsvToJson(
        blobName
      );

      return this.copilotOffringJsonArray;
    }
  }

  async csvToJsonConverterCopilotUseCase(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.copilotUsecaseJsonArray) {
      return Promise.resolve(this.copilotUsecaseJsonArray);
    } else {
      this.copilotUsecaseJsonArray = await this.commonService.convertCsvToJson(
        blobName
      );
      return this.copilotUsecaseJsonArray;
    }
  }
}
