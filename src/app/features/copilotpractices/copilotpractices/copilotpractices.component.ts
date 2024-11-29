import { Component, inject, ViewChild } from '@angular/core';
import { ListComponent } from '../../../shared/components/list/list.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../../../shared/components/grid/grid.component';
import { CopilotService } from '../copilot.service';
import { CommonService } from '../../../shared/services/common.service';
import { ButtonModule } from 'primeng/button';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RestService } from '../../../shared/services/rest.service';
import { ChipsModule } from 'primeng/chips';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  api,
  Constant,
  offiringcardgb,
  sorttingdata,
} from '../../../shared/constant/constant';
import { filter, map, pipe } from 'rxjs';
import { HeroCarouselComponent } from '../../../shared/components/hero-carousel/hero-carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { CharacterCutterPipe } from '../../../shared/pipes/character-cutter.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-copilotpractices',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    GridComponent,
    ButtonModule,
    SidebarModule,
    ChipModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ChipsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    FormsModule,
    HeroCarouselComponent,
    CarouselModule,
    CarouselComponent,
    CharacterCutterPipe,
  ],
  templateUrl: './copilotpractices.component.html',
  styleUrl: './copilotpractices.component.scss',
})
export class CopilotpracticesComponent {
  isListView: boolean = false;
  private copilotservice: CopilotService = inject(CopilotService);
  private commonService: CommonService = inject(CommonService);
  // private restService: RestService = inject(RestService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  projectList: any;
  industriesData: any;
  technologies: any;
  sidebarVisible: boolean = false;
  filterVisible: boolean = false;
  sidebarSortVisible: boolean = false;
  isListViewMode: boolean = false;
  sortSidebarVisible: boolean = false;
  selectedTechTags: string[] = [];
  selectedIndustryTag: string[] = [];
  sidebarHeader: string = '';
  heroSlider: any[] = [];
  copilotOfferingbg: string[] = [];

  //sortByData:string[] = ['A to Z', 'A to Z', 'A to Z', 'A to Z'];
  selectedCategory: any = null;
  sortByData: any[] = sorttingdata;
  formgroup!: FormGroup;
  usecaseSlides: any[] = [];
  offering: any[] = [];

  ngOnInit(): void {
    this.copilotOfferingbg = offiringcardgb;
    this.initFrom();
    this.selectedCategory = this.sortByData[1];
    this.loadCarousel();
    this.loadOffering();
    this.loadUseCase();
    // this.setbg();
  }

  initFrom() {
    this.formgroup = this.fb.group({
      sortby: [],
    });
  }

  async loadCarousel(): Promise<void> {
    try {
      this.heroSlider = await this.copilotservice.csvToJsonConverterCarousel(
        Constant.storageAccount,
        Constant.containerName,
        api.copilotCarousel
      );
    } catch (error) {
      console.error('Unable to load the Carousel ', error);
    }
  }

  async loadOffering(): Promise<void> {
    try {
      const rowData =
        await this.copilotservice.csvToJsonConverterCopilotOffering(
          Constant.storageAccount,
          Constant.containerName,
          api.copilot_offfering
        );

      this.offering = rowData
        .filter((item: any) => item.active.toLowerCase() === 'yes')
        .slice(0, 5);
      // .sort(
      //   (a, b) =>
      //     new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      // )
      // .slice(0, 10);
    } catch (error) {
      console.error('Unable to load the Carousel ', error);
    }
  }

  async loadUseCase(): Promise<void> {
    try {
      const rowData =
        await this.copilotservice.csvToJsonConverterCopilotUseCase(
          Constant.storageAccount,
          Constant.containerName,
          api.copilot_useCase
        );

      this.usecaseSlides = rowData
        .filter((item: any) => item.active.toLowerCase() === 'yes')
        .sort(
          (a: any, b: any) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        )
        .slice(0, 10);
    } catch (error) {
      console.error('Unable to load the Carousel ', error);
    }
  }

  HandleNvigation(id: any) {
    this.router.navigate(['', id]);
  }
  setbg(index: number): string {
    return this.copilotOfferingbg[index % this.copilotOfferingbg.length];
  }
}
