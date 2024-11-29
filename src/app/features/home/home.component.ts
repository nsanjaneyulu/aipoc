import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import {
  topProjectsConfig,
  valuedClentsConfig,
  bannerDetailsConfig,
  thumbnailDetailConfig,
} from './homeDto';
import { HomeService } from './home.service';
import { api, Constant } from '../../shared/constant/constant';
import { CarouselModule } from 'primeng/carousel';
import { ProjectsjsonService } from '../../shared/services/json/projectsjson.service';
import { CharacterCutterPipe } from '../../shared/pipes/character-cutter.pipe';
import { Router } from '@angular/router';
import { HeroCarouselComponent } from '../../shared/components/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonModule,
    PanelModule,
    ButtonModule,
    CardModule,
    GalleriaModule,
    CarouselModule,
    CharacterCutterPipe,
    HeroCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  valuedClients: any;
  items = topProjectsConfig;
  topProjects: any[] = [];
  // thumbnailDetail = thumbnailDetailConfig;
  private homeService: HomeService = inject(HomeService);
  private projectService: ProjectsjsonService = inject(ProjectsjsonService);
  private router: Router = inject(Router);
  visibleLogos: any[] = Array.from({ length: 27 }, (_, i) => `Item ${i + 1}`);
  currentStartIndex = 0;
  logosPerPage = 6;
  heroSlider: any;
  activeBannerIndex = 0;
  bannerDetails: any[] = [];
  numVisible: number = 1;
  numScroll: number = 1;
  statistics: { [key: string]: any[] } = {};
  currentPage = 0;
  itemsPerPage = 9;
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCarousel();
    this.loadPartners();
    this.loadLatestProjects();
    this.updateVisibleLogos();
    this.loadStatisTics();
    this.visibleLogos = Array.from({ length: 27 }, (_, i) => `Item ${i + 1}`);
  }

  get currentBanner() {
    return this.bannerDetails[this.activeBannerIndex];
  }

  updateVisibleLogos(): void {
    const start = this.currentStartIndex;
    const end = start + this.logosPerPage;
    this.visibleLogos = this.valuedClients?.slice(start, end);
  }

  prevItem(): void {
    this.currentStartIndex =
      this.currentStartIndex > 0
        ? this.currentStartIndex - this.logosPerPage
        : Math.max(0, this.valuedClients?.length - this.logosPerPage);

    this.updateVisibleLogos();
  }

  nextItem(): void {
    this.currentStartIndex =
      this.currentStartIndex < this.valuedClients?.length - this.logosPerPage
        ? this.currentStartIndex + this.logosPerPage
        : 0;

    this.updateVisibleLogos();
  }

  changeImage(direction: 'prev' | 'next'): void {
    const totalBanners = this.bannerDetails.length;
    this.activeBannerIndex =
      direction === 'next'
        ? (this.activeBannerIndex + 1) % totalBanners
        : (this.activeBannerIndex - 1 + totalBanners) % totalBanners;
  }

  getVisibleLogos(row: number): any[] {
    const start = row * 3;
    const end = (row + 1) * 3;
    return this.visibleLogos?.slice(start, end);
  }

  async loadCarousel(): Promise<void> {
    try {
      const rowData = await this.homeService.csvToJsonConverterCarousel(
        Constant.storageAccount,
        Constant.containerName,
        api.homeCarousel
      );
      this.heroSlider = rowData.filter(
        (item: any) => item.active.toLowerCase() === 'yes'
      );
    } catch (error) {
      console.error('Unable to load the Carousel ', error);
    }
    this.cdRef.detectChanges();
  }

  async loadPartners(): Promise<void> {
    try {
      const rowData = await this.homeService.csvToJsonConverterClients(
        Constant.storageAccount,
        Constant.containerName,
        api.partners
      );
      this.visibleLogos = rowData.filter(
        (item: any) => item?.active.toLowerCase() === 'yes'
      );
      console.log(this.visibleLogos);
    } catch (error) {
      console.error('Unable to load the Carousel ', error);
    }
  }

  nextPage() {
    if (
      this.currentPage <
      Math.ceil(this.visibleLogos.length / this.itemsPerPage) - 1
    ) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  get paginatedItems() {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.visibleLogos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  async loadLatestProjects(): Promise<void> {
    try {
      const rowData: any[] = await this.projectService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.projects
      );

      this.topProjects = rowData
        .filter((item: any) => item.active.toLowerCase() === 'yes')
        .sort(
          (a, b) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        )
        .slice(0, 10);
    } catch (error) {
      console.error('Unable to load the Carousel', error);
    }
  }

  async loadStatisTics(): Promise<void> {
    try {
      const rowData: any[] =
        await this.homeService.csvToJsonConverterStatistics(
          Constant.storageAccount,
          Constant.containerName,
          api.home_statistics
        );

      const filterData = rowData.filter(
        (item: any) => item.active.toLowerCase() === 'yes'
      );
      // const groupedItems: { [key: string]: any[] } = {};

      filterData.forEach((item) => {
        if (!this.statistics[item.type]) {
          this.statistics[item.type] = [];
        }
        this.statistics[item.type].push(item);
      });
    } catch (error) {
      console.error('Unable to load the Carousel', error);
    }
  }

  navigate(value: string, id: any) {
    const type = value.toLowerCase();
    if (type === 'other') {
      this.router.navigate(['otherprojects/summary', id]);
    } else {
      this.router.navigate(['otherprojects/summary', id]);
    }
  }
}
