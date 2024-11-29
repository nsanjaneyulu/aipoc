import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CharacterCutterPipe } from '../../pipes/character-cutter.pipe';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    CardModule,
    TagModule,
    ButtonModule,
    CharacterCutterPipe,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input() data: any;
  items: any[] = [];
  tags: string[] = [];
  @Output() changePPT = new EventEmitter();

  responsiveOptions: any[] | undefined;
  private router: Router = inject(Router);
  constructor() {}

  ngOnInit() {
    this.items = this.data;
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  handleNvigation(id: any) {
    this.router.navigate(['/copilotpractice/summary', id]);
  }
}
