import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isToggler: boolean = false;
  private commonService: CommonService = inject(CommonService);
  router = inject(Router);
  isExpandable: boolean = false;
  ngOnInit(): void {
    this.commonService.isExpandable$.subscribe((value) => {
      this.isExpandable = value;
    });
  }
}
