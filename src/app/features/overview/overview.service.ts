import { inject, Injectable, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { RestService } from '../../shared/services/rest.service';
import { Observable } from 'rxjs';
import { Constant } from '../../shared/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class OverviewService implements OnInit {
  private commonService:CommonService = inject(CommonService);
  private restService:RestService = inject(RestService);
  constructor() { }


  ngOnInit(): void {
    
  }
  
  getData(): Observable<any> {
    return this.restService.getAll(Constant.getAllroject);
   }

}
