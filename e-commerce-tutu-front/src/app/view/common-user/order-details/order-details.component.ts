import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserApiService } from '../../../service/user/user-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { DashboardApiService } from '../../../service/dashboard/dashboard-api.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: number;
  hashId: any;
  idPurchase: number;

  formulario: FormGroup;
  formAdmin: FormGroup;

  adress: string;
  neighborhood: string;
  state: string;
  city: string;
  cep: number;
  total: number;
  shipping: number;
  status: string;
  date_hour: any;
  delivery_status: string;
  name: string;
  email: string;
  tracking_code: string;

  items = [];

  token: any;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private form: FormBuilder,
    private userService: UserApiService,
    private acRoute: ActivatedRoute,
    public authService: AuthService,
    public dashboardService: DashboardApiService,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.hashId = e.url.split('/');
      }
    });
  }

  ngOnInit() {
    this.token = this.authService.getTokenData();
    this.isAdmin = this.token.admin;

    this.getPurchaseDetail();

    this.formulario = this.form.group({
      line1: [null],
      neighborhood: [null],
      state: [null],
      city: [null],
      cep: [null],
      email: [null],
      name: [null],
      status: [null],
      hour: [null],
      date: [null],
      shipping: [null],
      total: [null],
      item_name: [null],
      item_price: [null],
      item_quantity: [null],
      delivery_status: [null],
      tracking_code: [null]
    });

    this.formAdmin = this.form.group({
      id_user: [null],
      id_purchase: [null],
      status: [null, Validators.required],
      tracking_code: [null, Validators.required]
    });
  }

  getPurchaseDetail() {
    this.userService.getUserPurchaseDetail(this.hashId[2]).subscribe(res => {
      this.adress = res[0].adress.line1;
      this.neighborhood = res[0].adress.line2;
      this.state = res[0].adress.state;
      this.city = res[0].adress.city;
      this.cep = res[0].adress.postal_code;
      this.total = res[0].sale.amount.total;
      this.shipping = res[0].sale.amount.details.shipping;
      this.status = res[0].sale.state;
      this.date_hour = res[0].sale.create_time;
      this.delivery_status = res[0].status;
      this.name = res[0].name;
      this.email = res[0].email;
      this.tracking_code = res[0].tracking_code;

      for (const i of Object.keys(res)) {
        this.items = res;
      }
    });
  }

  onSubmit(form) {
    this.spinnerService.show();
    this.formAdmin.patchValue({
      id_user: this.token.id,
      id_purchase: parseInt(this.hashId[2], 10),
      status: 'A caminho'
    });

    this.dashboardService.sendUserCode(form.value).subscribe((res) => {
      if (res != null) {
        this.toastrService.success('Status alterado!', 'Sucesso!');
        this.spinnerService.hide();
      }

      this.toastrService.error('Erro ao alterar o status!', 'Erro!');
    });
  }

}

