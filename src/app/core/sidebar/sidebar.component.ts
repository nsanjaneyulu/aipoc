import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Menu, MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { menubar, socialLinks } from './menu-data';
import { CommonService } from '../../shared/services/common.service';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from './sidebar.service';
import { api, Constant } from '../../shared/constant/constant';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    BadgeModule,
    ButtonModule,
    MenubarModule,
    RippleModule,
    AvatarModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  items: any[] = menubar;
  isActiveLink: boolean = false;
  isSideNavToggle: boolean = false;
  activeRouter!: string;
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  @Output() sideNavToggle = new EventEmitter<any>();
  private commonService: CommonService = inject(CommonService);
  socialPlatFormList: any[] = [];
  isExpandable: boolean = false;
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private sidebarService: SidebarService = inject(SidebarService);

  ngOnInit(): void {
    this.activeRouter = this.router.url;
    this.items = menubar;
    this.socialPlatFormList = [];
    this.commonService.isExpandable$.subscribe((value) => {
      this.isExpandable = value;
    });
    this.loadSocialProfile();
  }

  // isActive(activerouter: any): boolean {
  //   return this.router.url === activerouter;
  // }
  isActive(route: string): boolean {
    return this.router.url === route;
  }
  onRouterLinkActive(isActive: boolean, routerlink: string) {
    if (isActive) {
      this.isActiveLink = true;
      this.activeRouter = routerlink; // Update the active router link
    } else {
      this.isActiveLink = false;
    }

  }

  getIconClass(item: any): any {
    const isActive = this.activeRouter === item.routerlink;
    const iconClass = isActive ? item.icon + '-active' : item.icon;
    return iconClass;
  }
  

  handdleToggleNav() {
    this.sideNavToggle.emit(this.isSideNavToggle);
  }

  async loadSocialProfile(): Promise<void> {
    try {
      const rowData = await this.sidebarService.csvToJsonConverter(
        Constant.storageAccount,
        Constant.containerName,
        api.socialMediaPlatform
      );

      this.socialPlatFormList = rowData.filter(
        (item: any) => item.active.toLowerCase() === 'yes'
      );
    } catch (error) {
      console.error('Unable to load the Carousel ', error);
    }
  }
}
