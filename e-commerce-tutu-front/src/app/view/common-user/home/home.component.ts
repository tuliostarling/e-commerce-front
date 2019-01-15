import { Component, OnInit } from '@angular/core';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HomeApiService } from '../../../service/home/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  // Imagens width: 1150px; height: 600px;

  carouselImages: any;


  constructor(
    config: NgbCarouselConfig,
    private homeService: HomeApiService
  ) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    this.getHomeBanners();
  }

  getHomeBanners() {
    this.homeService.getHomeImages().subscribe(res => {
      if (res != null) { this.carouselImages = res.map(x => x.location_aws); }
    });
  }

}
