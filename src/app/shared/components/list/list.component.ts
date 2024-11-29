import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CharacterCutterPipe } from '../../pipes/character-cutter.pipe';
import { defaultThumbnail } from '../../constant/constant';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    InputIconModule,
    RouterLink,
    ButtonModule,
    ChipModule,
    CardModule,
    SidebarModule,
    IconFieldModule,
    InputTextModule,
    CharacterCutterPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() technologiesData: any;
  @Input() industriesData: any;
  @Input() activeURL: any;
  projectData: any[] = [];
  industry: any[] = [];
  technologies: any[] = [];
  sidebarVisible: boolean = false;
  routPath: string = '';
  relativeImagePath: string = '';
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  defaultThumbnial: string = '';
  // routteConfig: any[] = [
  //   {
  //     copilotpractice: '/copilotpractice/summary',
  //     searchresult: '/searchresult/summary',
  //     otherprojects: '/otherprojects/summary',
  //     aiprojects: '/aiprojects/summary',
  //   },
  // ];
  constructor() {
    this.routPath = this.activeURL;
  }
  routteConfig: any[] = [
    {
      copilotpractice: '/copilotpractice/summary',
      searchresult: '/searchresult/summary',
      otherprojects: '/otherprojects/summary',
      aiprojects: '/aiprojects/summary',
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes['data'].firstChange &&
      changes['data'].previousValue != changes['data'].currentValue
    ) {
      this.projectData = changes['data'].currentValue;
    }
  }
  ngOnInit(): void {
    this.defaultThumbnial = defaultThumbnail;
    this.routPath = this.router.url;
    this.industry = this.technologiesData;
    this.technologies = this.industriesData;
    this.projectData = this.data.filter((item: any) => item?.title != '');
  }

  handleNavigation(id: any) {
    const route = this.routPath.replace(/^\/+/, '');

    if (route) {
      this.router.navigate([this.routteConfig[0][route], id]);
    }
  }
}
