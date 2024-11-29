import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { CarouselproductComponent } from '../../shared/components/carouselproduct/carouselproduct.component';
import { VideosService } from './videos.service';
import { api } from '../../shared/constant/constant';
import { CharacterCutterPipe } from '../../shared/pipes/character-cutter.pipe';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    RouterOutlet,
    CarouselModule,
    CardModule,
    CharacterCutterPipe,
    CarouselproductComponent,
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent implements OnInit {
  currentImageIndex = 0;
  currentImageIndexThumbnail = 0;
  itemsPerPage = 5;
  bannerImage: any;
  private videoService: VideosService = inject(VideosService);
  videoList: any[] = [];
  latestVideo: any;
  isPlaying: boolean = false;

  ngOnInit(): void {
    this.loadLatestVideo();
  }

  loadVideoOnClick(index: any) {
    if (index >= 0 && index < this.videoList.length) {
      this.latestVideo = this.videoList[index];
      this.isPlaying = true;
    } else {
      console.log(this.latestVideo);
      return this.latestVideo;
    }
  }

  async loadLatestVideo(): Promise<void> {
    try {
      const rowData: any[] = await this.videoService.csvToJsonConverter(
        api.videos
      );

      this.videoList = rowData
        .filter((item: any) => item.active.toLowerCase() === 'yes')
        .sort(
          (a: any, b: any) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );
      this.loadVideoOnClick(0);
    } catch (error) {
      console.error('Unable to load the videos', error);
    }
  }
  isPlayedVideo(index: any): boolean {
    const i = this.videoList[index];
    console.log(i);
    return index;
  }
}
