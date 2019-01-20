import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DashboardApiService } from '../../../service/dashboard/dashboard-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page: number;
  formTotal: FormGroup;
  formFee: FormGroup;
  formQuantity: FormGroup;

  pageArr = [
    {
      active: 'active',
      name: 'Lucro'
    },
    {
      active: '',
      name: 'Despesas'
    },
    {
      active: '',
      name: 'Quantidade'
    }
  ];

  namePageAux = 'Lucro';

  constructor(
    private router: Router,
    private form: FormBuilder,
    private acRoute: ActivatedRoute,
    public dashboardService: DashboardApiService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  rowsPurchases: any;
  resultTotal: any;
  resultFee: any;
  rowsQuantity: any;

  ngOnInit() {
    this.acRoute.url
      .subscribe(_ => {
        this.spinnerService.show();
        this.page = parseInt(this.acRoute.snapshot.paramMap.get('page'), 10);

        this.getPurchases();
      });

    this.formTotal = this.form.group({
      date: [null, Validators.required]
    });

    this.formFee = this.form.group({
      initialDate: [null, Validators.required],
      finalDate: [null, Validators.required]
    });

    this.formQuantity = this.form.group({
      initialDate: [null, Validators.required],
      finalDate: [null, Validators.required]
    });
  }

  onSubmitTotal(form) {
    this.spinnerService.show();
    this.dashboardService.getTotalProfit(form.value).subscribe((res) => {
      if (res != null) {
        this.resultTotal = res[0].sum;
        this.spinnerService.hide();
      }
      this.spinnerService.hide();
    });
  }

  onSubmitFee(form) {
    this.spinnerService.show();
    this.dashboardService.getFee(form.value).subscribe((res) => {
      if (res != null) {
        this.resultFee = res[0].sum;
        this.spinnerService.hide();
      }
      this.spinnerService.hide();
    });
  }

  onSubmitQuantity(form) {
    this.spinnerService.show();
    this.dashboardService.getTotalSold(form.value).subscribe((res) => {
      if (res != null) {
        console.log(res);
        this.rowsQuantity = res;
        this.spinnerService.hide();
      }
      this.spinnerService.hide();
    });
  }

  getPurchases() {
    this.dashboardService.getSellOut(this.page).subscribe((res) => {
      if (res != null) {
        this.rowsPurchases = res;

        this.spinnerService.hide();
      }
    });
  }

  getOnePurchase(id: number) {
    this.router.navigateByUrl('order_details/' + id);
  }

  changePage(namePage: string) {
    if (namePage === 'Lucro') {
      this.pageArr[0].active = 'active';
      this.pageArr[1].active = '';
      this.pageArr[2].active = '';
      this.namePageAux = 'Lucro';
    } else if (namePage === 'Despesas') {
      this.pageArr[0].active = '';
      this.pageArr[1].active = 'active';
      this.pageArr[2].active = '';
      this.namePageAux = 'Despesas';
    } else {
      this.pageArr[0].active = '';
      this.pageArr[1].active = '';
      this.pageArr[2].active = 'active';
      this.namePageAux = 'Quantidade';
    }
  }
}
