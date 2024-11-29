import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CommonService } from './shared/services/common.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, ButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private commonService: CommonService = inject(CommonService);
  title = 'ai-poc';
  isLoggedIn: boolean = false;
  router = inject(Router);
  ngOnInit(): void {
    this.commonService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      });
  }
}
