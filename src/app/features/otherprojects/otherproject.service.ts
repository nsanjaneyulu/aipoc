import { inject, Injectable } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherprojectService {
  projectList:any[] = []
  private dataservice: DataService =inject(DataService)
  constructor() { }

  getProjects():Observable<any>{
    
    return of(this.dataservice)
  }
}
