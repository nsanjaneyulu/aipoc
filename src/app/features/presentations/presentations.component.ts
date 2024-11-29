import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { presentationsConfig } from './presentationsDto';
import { ChipModule } from 'primeng/chip';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import {
  api,
  Constant,
  defaultThumbnail,
} from '../../shared/constant/constant';
import { PresentationService } from './presentation.service';
import { CharacterCutterPipe } from '../../shared/pipes/character-cutter.pipe';
@Component({
  selector: 'app-presentations',
  standalone: true,
  imports: [
    RouterOutlet,
    CarouselModule,
    CardModule,
    NgxDocViewerModule,
    ChipModule,
    CarouselComponent,
    CharacterCutterPipe,
  ],
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss'],
})
export class PresentationsComponent implements OnInit {
  private presentationService: PresentationService =
    inject(PresentationService);
  currentImageIndex = 0;
  currentImageIndexThumbnail = 0;
  itemsPerPage = 5;
  bannerImages: any;
  bannerPPT: any;
  titlePPT: any;
  descPPT: any;
  currentPresentation: any;
  presentations: any[] = [];
  defaultThumbnial: string = '';
  tags: string[] = [];
  constructor() {}
  ngOnInit() {
    this.defaultThumbnial = defaultThumbnail;
    this.loadPresentations();
    this.loadPresentationOnClick(0);
  }

  changeImage(direction: 'prev' | 'next') {
    const lastIndex = this.bannerImages.length - 1;
    this.currentImageIndex =
      direction === 'next'
        ? (this.currentImageIndex + 1) % this.bannerImages.length
        : this.currentImageIndex === 0
        ? lastIndex
        : this.currentImageIndex - 1;
  }
  get visiblePresentations() {
    const start = this.currentImageIndexThumbnail * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.presentations.slice(start, end);
  }
  changeThumbnail(direction: 'prev' | 'next') {
    const totalSets = Math.ceil(this.presentations.length / this.itemsPerPage);
    this.currentImageIndexThumbnail =
      direction === 'next'
        ? (this.currentImageIndexThumbnail + 1) % totalSets
        : this.currentImageIndexThumbnail === 0
        ? totalSets - 1
        : this.currentImageIndexThumbnail - 1;
  }
  loadPresentationOnClick(index: any) {
    if (index >= 0 && index < this.presentations.length) {
      this.currentPresentation = this.presentations[index];
      this.tags = this.presentations[index]?.tagsCSV;
    } else {
      return this.currentPresentation;
    }
  }

  async loadPresentations(): Promise<void> {
    try {
      const rowData: any[] = await this.presentationService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.persentations
      );

      this.presentations = rowData
        .filter((item: any) => item.active.toLowerCase() === 'yes')
        .sort(
          (a: any, b: any) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );

      if (this.presentations.length > 0) {
        this.currentPresentation = this.presentations.reduce(
          (latest: any, current: any) => {
            return new Date(current.createdOn) > new Date(latest.createdOn)
              ? current
              : latest;
          }
        );
      } else {
        this.currentPresentation = null; // or some default value
      }
    } catch (error) {
      console.error('Unable to load the Carousel', error);
    }
  }
}
