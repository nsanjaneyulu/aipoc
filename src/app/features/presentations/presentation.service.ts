import { inject, Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  private commonService: CommonService = inject(CommonService);
  carouselJsonArray: any;
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
}
