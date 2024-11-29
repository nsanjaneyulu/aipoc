import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { imagesConfig } from '../../../features/serviceCatelog/serviceCatelogDto';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { Constant, defaultThumbnail } from '../../constant/constant';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-carouselproduct',
  standalone: true,
  imports: [CommonModule, CarouselModule, GalleriaModule, ButtonModule],
  templateUrl: './carouselproduct.component.html',
  styleUrl: './carouselproduct.component.scss',
})
export class CarouselproductComponent implements OnInit, OnChanges {
  products: { url: string }[] = [];
  responsiveOptions: any[] | undefined;
  @Output() slectedChnage: EventEmitter<any> = new EventEmitter<any>();
  @Input() items: any;
  @Input() data?: any;
  position: any = 'bottom';
  showItemNavigators = 'true';
  defaultThumbnial: string = '';
  fileExtation?: string;
  _activeIndex: number = 0;
  isVideoPlayer: boolean = false;
  @Output() changeSlide = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.products = changes['data'].currentValue;
    }
  }
  ngOnInit(): void {
    this.defaultThumbnial = defaultThumbnail;
    this.products = this.data.map((url: string) => ({
      url,
    }));

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(newValue) {
    if (
      this.products &&
      0 <= newValue &&
      newValue <= this.products.length - 1
    ) {
      this._activeIndex = newValue;
    }
  }

  next() {
    this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }
  onChnageEvent(item: any) {
    this.slectedChnage.emit(item);
  }

  getMediaType(url: string) {
    if (typeof url !== 'string') {
      return;
    }
    const fileName = url.split('/').pop(); // Get the last segment of the URL
    const extension = fileName?.split('.').pop(); // Get the extension
    if (extension?.toLowerCase() == 'png') {
      return 'image';
    } else {
      return 'video';
    }
  }
}
