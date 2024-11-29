import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-no-result',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './no-result.component.html',
  styleUrl: './no-result.component.scss',
})
export class NoResultComponent {
  banner: string = '../../../assets/images/public/no-result-banner.svg';
  headText: string = 'Oops...';
  subtitleText: string = 'No Search Result found';
  private location: Location = inject(Location);

  goBack() {
    this.location.back();
  }
}
