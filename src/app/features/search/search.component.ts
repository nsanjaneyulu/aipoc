import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  
}
