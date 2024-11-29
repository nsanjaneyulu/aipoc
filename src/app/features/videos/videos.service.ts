import { inject, Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private commonService: CommonService = inject(CommonService);
  carouselJsonArray: any;
  constructor() { }

  async csvToJsonConverter(
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
