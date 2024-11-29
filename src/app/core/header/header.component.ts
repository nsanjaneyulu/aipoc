import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { CommonService } from '../../shared/services/common.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { SearchComponent } from '../../features/search/search.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    MenuModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    AvatarGroupModule,
    AvatarModule,
    ButtonModule,
    SearchComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() togglr = new EventEmitter<string>();
  private commonService: CommonService = inject(CommonService);
  private destroy$ = new Subject<void>();
  items: MenuItem[] | undefined;
  isValue: boolean = false;
  userprofile: string = 'Admin';
  profileImage: string = '../../assets/images/avatar.png';
  private router: Router = inject(Router);
  private subscription?: Subscription;
  private location: Location = inject(Location);
  private searchSubject: Subject<string> = new Subject();
  searchText: string = '';

  toggle() {
    this.isValue = !this.isValue; // Toggle the value
    this.toggleSideNav(this.isValue);
  }

  toggleSideNav(value: boolean) {
    this.commonService.isExpandableSubject$.next(value);
  }

  ngOnInit() {
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(1000) // 1 second debounce time
      )
      .subscribe((value) => {
        this.searchHandle(value);
      });
  }

  searchInput(value: any) {
    // debugger
    this.searchSubject.next(value);
    this.commonService.globalSearch$.next(value);
    if (value.length >= 3) {
      this.searchSubject.next(value);
    }
  }

  searchHandle(value: string) {
    this.router.navigate(['/searchresult']);
    this.commonService.globalSearch$.next(value);
  }

  clearSearch(value: string) {
    if (value.length === 0) {
      this.location.back();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
