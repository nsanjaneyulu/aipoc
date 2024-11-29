import { inject, Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private commonService: CommonService = inject(CommonService);
  mediaJsonArray: any;
  constructor() {}

  async csvToJsonConverter(
    StorageAccount: string,
    containerName: string,
    blobName: string
  ): Promise<any> {
    if (this.mediaJsonArray) {
      return Promise.resolve(this.mediaJsonArray);
    } else {
      this.mediaJsonArray = await this.commonService.convertCsvToJson(
        blobName
      );
      return this.mediaJsonArray;
    }
  }
}
