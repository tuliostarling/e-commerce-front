import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HomeApiService } from '../../../../service/home/home-api.service';
import { SubProductModel } from '../../../../model/product/product';
import { ToastrService } from 'ngx-toastr';
import { CarouselImagesModel } from '../../../../model/home/home';

@Component({
  selector: 'app-home-controller-register',
  templateUrl: './home-controller-register.component.html',
  styleUrls: ['./home-controller-register.component.css']
})
export class HomeControllerRegisterComponent implements OnInit {

  formulario: FormGroup;

  idType: string;
  nameType: string;
  subProducts: SubProductModel;
  createCarouselImagemsForm: CarouselImagesModel;

  constructor(
    public router: Router,
    public acRoute: ActivatedRoute,
    private form: FormBuilder,
    public homeService: HomeApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.acRoute.params
      .subscribe((params: any) => {
        if (params.hasOwnProperty('id')) {
          this.idType = params.id;
          if (this.idType === '1') {
            this.nameType = 'carousel';
          } else {
            this.nameType = 'produtos mais vendidos';
          }
        }
      });

    this.formulario = this.form.group({
      id_home: [null],
      location_aws: [null, Validators.required],
      key_aws: [null, Validators.required]
    });

    if (this.idType === '2') {
      this.getAllSubProducts();
    }
  }

  getAllSubProducts() {
    this.homeService.getAllSubProducts().subscribe((res) => {
      if (res != null) {
        this.subProducts = res;
      }
    });
  }

  returnToList() {
    this.router.navigateByUrl(`/home_controller_list`);
  }

  onSubmit(form: FormGroup) {
  }
}
