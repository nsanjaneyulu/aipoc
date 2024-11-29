import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CopilotService } from '../../copilotpractices/copilot.service';
import { CommonService } from '../../../shared/services/common.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { sorttingdata } from '../../../shared/constant/constant';
import { ListComponent } from '../../../shared/components/list/list.component';
import { GridComponent } from '../../../shared/components/grid/grid.component';
import { IndustriesjosnService } from '../../../shared/services/json/industriesjosn.service';
import { ProjectsjsonService } from '../../../shared/services/json/projectsjson.service';
import { TechnologiesosnService } from '../../../shared/services/json/technologiesjosn.service';
import { ProjecttypejsonService } from '../../../shared/services/json/projecttypejson.service';
@Component({
  selector: 'app-aiprojects',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ChipModule,
    SidebarModule,
    ButtonModule,
    CardModule,
    ListComponent,
    GridComponent,
    ReactiveFormsModule,
    RadioButtonModule,
  ],
  templateUrl: './aiprojects.component.html',
  styleUrl: './aiprojects.component.scss',
})
export class AiprojectsComponent implements OnInit {
  commonService: CommonService = inject(CommonService);
  copilotservice: CopilotService = inject(CopilotService);
  isAscending: boolean = false;
  private router: Router = inject(Router);
  projectList: any;
  industriesData: any;
  technologies: any;
  projecttype: any;
  sidebarVisible: boolean = false;
  filterVisible: boolean = false;
  sidebarSortVisible: boolean = false;
  isListViewMode: boolean = false;
  sortSidebarVisible: boolean = false;
  selectedTechTags: string[] = [];
  selectedIndustryTag: string[] = [];
  sidebarHeader: string = '';
  routerUrl: string;
  form!: FormGroup;
  selectedCategory: any = null;
  sortByData: any[] = [];
  private fb: FormBuilder = inject(FormBuilder);
  private industriesjosnService: IndustriesjosnService = inject(
    IndustriesjosnService
  );
  private technologiesosnService: TechnologiesosnService = inject(
    TechnologiesosnService
  );
  private projectsService: ProjectsjsonService = inject(ProjectsjsonService);
  private projecttypeService: ProjecttypejsonService = inject(
    ProjecttypejsonService
  );

  constructor() {
    this.routerUrl = this.router.url;
    this.projectsService.projects$.subscribe((res: any) => {
      if (res.length != 0) {
        const data = res;
        this.projectList = data?.filter(
          (obj: any) => obj?.type.toLowerCase() === 'other'
        );
      }
    });

    this.industriesjosnService.industries$.subscribe((res: any) => {
      this.industriesData = res;
    });
    this.technologiesosnService.technologies$.subscribe((res: any) => {
      this.technologies = res;
    });
    this.projecttypeService.projecttype$.subscribe((res: any) => {
      this.projecttype = res;
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.sortByData = sorttingdata;
  }

  initForm() {
    this.form = this.fb.group({
      sortby: [''],
    });
  }

  toggleSort() {
    this.projectList = this.projectList.sort((a: any, b: any) =>
      this.isAscending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    this.isAscending = !this.isAscending;
  }
  sortByAccending() {
    this.projectList = this.projectList.sort((a: any, b: any) =>
      this.isAscending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    this.isAscending;
  }

  initData() {}

  openSortSidebar() {
    this.sidebarVisible = true;
    this.sidebarHeader = 'Sort';
    this.filterVisible = false;
    this.sortSidebarVisible = true;
  }

  openFilterSidebar() {
    this.filterVisible = true;
    this.sidebarVisible = true;
    this.sidebarHeader = 'Filters';
    this.sortSidebarVisible = false;
  }

  togleListViewMode() {
    this.isListViewMode = !this.isListViewMode;
    this.listViewMode(this.isListViewMode);
  }
  listViewMode(value: boolean) {
    this.commonService.isListViewData$.next(value);
  }

  reloadPage() {
    window.location.reload();
  }
  closeCallback(e: any): void {
    this.clearTachTags();
    this.clearIndustryTags();
  }

  clearFilter() {
    this.clearTachTags();
    this.clearIndustryTags();
  }

  onClickTechChip(item: string): void {
    const index = this.selectedTechTags.indexOf(item);
    if (index === -1) {
      this.selectedTechTags.push(item); // Add item if not selected
    } else {
      this.selectedTechTags.splice(index, 1); // Remove item if already selected
    }
  }

  onClickIndustryChip(item: string): void {
    const index = this.selectedIndustryTag.indexOf(item);
    if (index === -1) {
      this.selectedIndustryTag.push(item); // Add item if not selected
    } else {
      this.selectedIndustryTag.splice(index, 1); // Remove item if already selected
    }
  }

  clearIndustryTags(): void {
    this.selectedIndustryTag = []; // Clear all selected tags
  }
  clearTachTags(): void {
    this.selectedIndustryTag = []; // Clear all selected tags
  }
}
