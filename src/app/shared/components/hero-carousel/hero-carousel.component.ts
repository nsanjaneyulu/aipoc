import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

//import { ProductService } from '@service/productservice';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CopilotService } from '../../../features/copilotpractices/copilot.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, RouterLink],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
})
export class HeroCarouselComponent implements OnInit {
  visibleSlide: number = 0;
  scrollSlide: number = 0;
  responsiveOptions: any[] | undefined;
  heroslides: any[] = [];
  @Input() data: any;
  @Input() numVisible: any;
  @Input() numScroll: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      this.heroslides = changes['data'].currentValue.currentValue.filter(
        (item: any) => item.active.toLowerCase() === 'yes'
      );
    } else {
      this.heroslides = changes['data'].currentValue.filter(
        (item: any) => item.active.toLowerCase() === 'yes'
      );
      console.log(this.heroslides);
    }
  }

  ngOnInit() {
    this.heroslides = this.data;
    this.visibleSlide = this.numVisible;
    this.scrollSlide = this.numScroll;
    // this.responsiveOptions = [
    //   {
    //     breakpoint: '1400px',
    //     numVisible: 1,
    //     numScroll: 1,
    //   },
    //   {
    //     breakpoint: '1220px',
    //     numVisible: 1,
    //     numScroll: 1,
    //   },
    //   {
    //     breakpoint: '1100px',
    //     numVisible: 1,
    //     numScroll: 1,
    //   },
    // ];
  }
}
