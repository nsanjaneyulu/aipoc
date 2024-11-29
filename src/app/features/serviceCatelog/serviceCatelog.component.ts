import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { imagesConfig } from './serviceCatelogDto';

@Component({
  selector: 'app-serviceCatelog',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './serviceCatelog.component.html',
  styleUrl: './serviceCatelog.component.scss',
})
export class ServiceCatelogComponent {
  items = imagesConfig;
  currentIndex = 0;
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
}
