import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultThumbnail } from '../../constant/constant';
import { CharacterCutterPipe } from '../../pipes/character-cutter.pipe';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, CardModule, ChipModule, CharacterCutterPipe],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
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
    this.projectData = this.data;
  }

  handleNavigation(id: any) {
    const route = this.routPath.replace(/^\/+/, '');
    if (route) {
      this.router.navigate([this.routteConfig[0][route], id]);
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
