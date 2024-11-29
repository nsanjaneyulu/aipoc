import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CarouselproductComponent } from '../../../shared/components/carouselproduct/carouselproduct.component';
import { Constant, api } from '../../../shared/constant/constant';
import { CopilotService } from '../copilot.service';
import { ActivatedRoute } from '@angular/router';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-copilotoverviw',
  standalone: true,
  imports: [
    CommonModule,
    CarouselproductComponent,
    ButtonModule,
    ChipModule,
    DividerModule,
  ],
  templateUrl: './copilotoverviw.component.html',
  styleUrl: './copilotoverviw.component.scss',
})
export class CopilotoverviwComponent implements OnInit {
  private copilotService: CopilotService = inject(CopilotService);
  private location: Location = inject(Location);
  private route: ActivatedRoute = inject(ActivatedRoute);
  project: any;
  id?: number;
  bannerList: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((param: any) => {
      this.id = param.get('id').toString();
    });
    this.loadProjectById(this.id);
  }

  goBack() {
    this.location.back();
  }

  async loadProjectById(id: any): Promise<void> {
    try {
      this.project = await this.copilotService.csvToJsonConverterCopilotUseCase(
        Constant.storageAccount,
        Constant.containerName,
        api.copilot_useCase
      );
      this.project = this.project.find((obj: any) => obj?.id === id);
      this.bannerList = this.project.galleryCSV;
    } catch (error) {
      console.error('Unable to load the Technologies ', error);
    }
  }

  changeSlide() {}
}
