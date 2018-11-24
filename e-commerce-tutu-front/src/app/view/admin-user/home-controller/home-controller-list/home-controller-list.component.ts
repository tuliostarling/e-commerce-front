import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeApiService } from '../../../../service/home/home-api.service';
import { HomeModel } from '../../../../model/home/home';

@Component({
  selector: 'app-home-controller-list',
  templateUrl: './home-controller-list.component.html',
  styleUrls: ['./home-controller-list.component.css']
})
export class HomeControllerListComponent implements OnInit {

  rows: HomeModel;

  constructor(
    public router: Router,
    public homeService: HomeApiService
  ) { }

  ngOnInit() {
    this.getHomeTypes();
  }

  getHomeTypes() {
    this.homeService.getHomeTypes().subscribe((res) => {
      if (res != null) {
        this.rows = res;
      }
    });
  }

  navToEdit(id: number) {
    this.router.navigateByUrl(`/home_controller_edit/${id}`);
  }
}
