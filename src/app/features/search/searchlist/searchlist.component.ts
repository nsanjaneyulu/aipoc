import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ListComponent } from '../../../shared/components/list/list.component';
import { GridComponent } from '../../../shared/components/grid/grid.component';
import { CommonService } from '../../../shared/services/common.service';
import { Router } from '@angular/router';
import { ProjectsjsonService } from '../../../shared/services/json/projectsjson.service';
import { api, Constant } from '../../../shared/constant/constant';
import { NoResultComponent } from '../../../shared/components/no-result/no-result.component';

@Component({
  selector: 'app-searchlist',
  standalone: true,
  imports: [CommonModule, ListComponent, GridComponent, NoResultComponent],
  templateUrl: './searchlist.component.html',
  styleUrl: './searchlist.component.scss',
})
export class SearchlistComponent implements OnInit {
  isGridViewMode: boolean = true;
  private projectService: ProjectsjsonService = inject(ProjectsjsonService);
  private commonService: CommonService = inject(CommonService);
  private router: Router = inject(Router);
  searchResult: any[] = [];
  searchValue: string = '';
  constructor() {
    this.commonService.globalSearch$.subscribe((res) => {
      this.searchValue = res;

      this.loadData();
    });
  }
  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      const rawData = await this.projectService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.search
      );

      const searchValue = this.searchValue.trim().toLowerCase();
      if (searchValue) {
        this.searchResult = rawData.filter(
          (obj: any) =>
            obj.title && obj.title.toLowerCase().includes(searchValue)
        );
      } else {
        this.searchResult = [];
      }
    } catch (error) {
      console.error('Unable to load the Technologies', error);
    }
  }

  handlePageNavigation() {
    this.router.navigate(['overview']);
  }
}
