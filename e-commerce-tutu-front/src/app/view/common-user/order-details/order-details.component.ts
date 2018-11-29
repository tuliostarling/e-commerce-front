import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../../../service/user/user-api.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  id: number;

  constructor(
    private router: Router,
    private userService: UserApiService,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    this.getPurchaseDetail();
  }

  getPurchaseDetail() {
    this.userService.getUserPurchaseDetail(this.id).subscribe(res => {
      console.log(res);
    });
  }

}

