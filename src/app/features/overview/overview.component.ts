import { Component, inject, OnInit } from '@angular/core';
import { imagesConfig } from '../serviceCatelog/serviceCatelogDto';
import { CommonModule, Location } from '@angular/common';
import { CarouselproductComponent } from '../../shared/components/carouselproduct/carouselproduct.component';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { ProjectsjsonService } from '../../shared/services/json/projectsjson.service';
import { api, Constant } from '../../shared/constant/constant';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    CarouselproductComponent,
    ButtonModule,
    DividerModule,
    ChipModule,
    RouterLink,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  items = imagesConfig;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private commonService: CommonService = inject(CommonService);
  private projectsService: ProjectsjsonService = inject(ProjectsjsonService);
  project: any;

  bannerList: any[] = [];
  currentIndex = 0;
  id: any = null;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: any) => {
      this.id = param.get('id').toString();
    });
    this.loadProjectById(this.id);
  }

  get currentImage() {
    return this.items[this.currentIndex];
  }
  navigate(direction: 'prev' | 'next') {
    this.currentIndex =
      direction === 'prev'
        ? (this.currentIndex - 1 + this.items.length) % this.items.length
        : (this.currentIndex + 1) % this.items.length;
  }

  selectItem(index: number) {
    this.currentIndex = index;
  }
  goBack() {
    this.location.back();
  }

  async loadProjectById(id: any): Promise<void> {
    try {
      this.project = await this.projectsService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.projects
      );
      this.project = this.project.find((obj: any) => obj?.id === id);
      this.bannerList = this.project?.galleryCSV;
    } catch (error) {
      console.error('Unable to load the Technologies ', error);
    }
  }

  gotoTryApplication(url: string) {
    window.open(url, '_blank');
    //  window.location.href = url;
  }
  gotoGuide(url: string) {
    window.open(url, '_blank');
  }
}
