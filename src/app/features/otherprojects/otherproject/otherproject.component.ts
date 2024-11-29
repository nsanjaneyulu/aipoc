import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../../shared/components/list/list.component';
import { GridComponent } from '../../../shared/components/grid/grid.component';
import { CommonService } from '../../../shared/services/common.service';
import { CopilotService } from '../../copilotpractices/copilot.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { api, Constant, sorttingdata } from '../../../shared/constant/constant';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Subscription } from 'rxjs';
import { IndustriesjosnService } from '../../../shared/services/json/industriesjosn.service';
import { ProjectsjsonService } from '../../../shared/services/json/projectsjson.service';
import { TechnologiesosnService } from '../../../shared/services/json/technologiesjosn.service';
import { ProjecttypejsonService } from '../../../shared/services/json/projecttypejson.service';
import { NoResultComponent } from '../../../shared/components/no-result/no-result.component';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-otherproject',
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
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NoResultComponent,
    DividerModule,
  ],
  templateUrl: './otherproject.component.html',
  styleUrl: './otherproject.component.scss',
})
export class OtherprojectComponent implements OnInit {
  commonService: CommonService = inject(CommonService);
  copilotservice: CopilotService = inject(CopilotService);
  isAscending: boolean = false;
  private router: Router = inject(Router);
  projectList: any;
  projects: any;
  filteredProjectLists: any;
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
  selectedProjectTag: string[] = [];
  sidebarHeader: string = '';
  routerUrl: string;
  form!: FormGroup;
  selectedCategory: any = null;
  sortByData: any[] = [];
  sortByvalue?: string;
  private fb: FormBuilder = inject(FormBuilder);
  private industriesjosnService: IndustriesjosnService = inject(
    IndustriesjosnService
  );
  private technologiesosnService: TechnologiesosnService = inject(
    TechnologiesosnService
  );
  private projecttypejsonService: ProjecttypejsonService = inject(
    ProjecttypejsonService
  );
  private projectsService: ProjectsjsonService = inject(ProjectsjsonService);
  subscription: Subscription = new Subscription();
  //@ViewChild('sidebar') sidebar?: ElementRef;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  constructor() {
    this.routerUrl = this.router.url;
  }

  async loadProjects(): Promise<void> {
    try {
      this.projectList = await this.projectsService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.projects
      );
      if (this.routerUrl == '/aiprojects') {
        this.projectList = this.projectList.filter(
          (obj: any) => obj?.type.toLowerCase() === 'ai'
        );
      } else {
        this.projectList = this.projectList.filter(
          (obj: any) => obj?.type.toLowerCase() === 'other'
        );
      }
      //console.log(this.projectList);

      // this.projectList = this.projectList.filter(
      //   (obj: any) => obj?.type.toLowerCase() === 'other'
      // );
      this.filteredProjectLists = [...this.projectList];
    } catch (error) {
      console.error('Unable to load the Technologies ', error);
    }
  }

  async loadProjectType(): Promise<void> {
    try {
      this.projecttype =
        await this.projectsService.csvToJsonConverterProjectType(
          Constant.storageAccount,
          Constant.containerName,
          api.categories
        );
    } catch (error) {
      console.error('Unable to load the project categories ', error);
    }
  }

  async loadTechnologies(): Promise<void> {
    try {
      this.technologies = await this.technologiesosnService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.technologies
      );
    } catch (error) {
      console.error('Unable to load the Technologies ', error);
    }
  }

  async loadIndustries(): Promise<void> {
    try {
      this.industriesData = await this.industriesjosnService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.industris
      );
    } catch (error) {
      console.error('Unable to load the industris ', error);
    }
  }

  ngOnInit(): void {
    this.sortByData = sorttingdata;
    this.loadTechnologies();
    this.loadProjectType();
    this.loadIndustries();
    this.loadProjects();
    window.scrollTo(0, 0);
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      sortby: [''],
      searchControl: [''],
    });
  }

  sortByAscending() {
    this.sortByvalue = this.form.get('sortby')?.value?.key;

    this.filteredProjectLists = this.filteredProjectLists.sort(
      (a: any, b: any) => {
        if (this.sortByvalue === 'asc') {
          return a.title.localeCompare(b.title);
        } else if (this.sortByvalue === 'des') {
          return b.title.localeCompare(a.title);
        } else if (this.sortByvalue === 'size') {
          return a.projectSize - b.projectSize;
        } else if (this.sortByvalue === 'latestproject') {
          const dateA = new Date(a.createdOn);
          const dateB = new Date(b.createdOn);
          return dateB.getTime() - dateA.getTime();
        }
        //  this.hideSidebar();
        return 0;
      }
    );
  }

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

  // closeCallback(e: any): void {
  //   this.clearTachTags();
  //   this.clearIndustryTags();
  //   this.clearProjectTags();
  // }

  onClickTechChip(item: string): void {
    const index = this.selectedTechTags.indexOf(item);
    if (index === -1) {
      this.selectedTechTags.push(item);
    } else {
      this.selectedTechTags.splice(index, 1);
    }
  }

  onClickIndustryChip(item: string): void {
    const index = this.selectedIndustryTag.indexOf(item);
    if (index === -1) {
      this.selectedIndustryTag.push(item);
    } else {
      this.selectedIndustryTag.splice(index, 1);
    }
  }

  onClickProjectChip(item: string): void {
    const index = this.selectedProjectTag.indexOf(item);
    if (index === -1) {
      this.selectedProjectTag.push(item);
    } else {
      this.selectedProjectTag.splice(index, 1);
    }
  }

  clearIndustryTags(): void {
    this.selectedIndustryTag = [];
  }
  clearTachTags(): void {
    this.selectedIndustryTag = [];
  }
  clearProjectTags(): void {
    this.selectedProjectTag = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFilterHandle() {
    const searchText =
      this.form.get('searchControl')?.value?.toLowerCase() ?? '';
    if (
      !searchText &&
      !this.selectedTechTags.length &&
      !this.selectedIndustryTag.length &&
      !this.selectedProjectTag.length
    ) {
      this.filteredProjectLists = [...this.projectList];
      return;
    }
    this.filteredProjectLists = this.projectList.filter((item: any) => {
      const matchesSearchText =
        !searchText || item.title?.toLowerCase().includes(searchText);

      const matchedTechTags =
        this.selectedTechTags.length === 0 ||
        this.selectedTechTags.some((selectedTag: any) =>
          item.tagsCSV.some(
            (tag: string) =>
              selectedTag.title?.toLowerCase() === tag?.toLowerCase()
          )
        );

      const matchesIndustryTags =
        this.selectedIndustryTag.length === 0 ||
        this.selectedIndustryTag.some((selectedTag: any) =>
          item.tagsCSV.some(
            (tag: string) =>
              selectedTag.label?.toLowerCase().trim() ===
              tag?.toLowerCase().trim()
          )
        );

      const matchesProjectTags =
        this.selectedProjectTag.length === 0 ||
        this.selectedProjectTag.some((selectedTag: any) =>
          item.tagsCSV.some(
            (tag: string) =>
              selectedTag.title?.toLowerCase() === tag?.toLowerCase()
          )
        );
      this.hideSidebar();
      return (
        matchesSearchText &&
        matchedTechTags &&
        matchesIndustryTags &&
        matchesProjectTags
      );
    });
  }

  clearFilter() {
    this.form.reset();
    this.selectedTechTags = [];
    this.selectedIndustryTag = [];
    this.selectedProjectTag = [];
    this.filteredProjectLists = [...this.projectList];
  }

  // handelSubmit(e: any) {
  //   console.log(e);
  //   this.sidebarHeader === 'Sort'
  //     ? this.sortByAscending()
  //     : this.onFilterHandle();
  //   this.sidebarRef?.hide();
  // }
  hideSidebar() {
    this.sidebarVisible = false;
  }
}
