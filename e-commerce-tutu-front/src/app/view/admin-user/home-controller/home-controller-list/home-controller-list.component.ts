import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HomeApiService } from '../../../../service/home/home-api.service';
import { SubProductModel } from '../../../../model/product/product';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-home-controller-list',
  templateUrl: './home-controller-list.component.html',
  styleUrls: ['./home-controller-list.component.css']
})
export class HomeControllerListComponent implements OnInit {

  formulario: FormGroup;
  idType: string;
  nameType: string;
  subProducts: SubProductModel;

  LoadCurrentImg: any;
  imgSRC: any;

  formData: FormData = new FormData();
  imagesToUpload: any;
  rowsImagesObj: any;

  pageArr = [
    {
      active: 'active',
      name: 'Banner Images'
    },
    {
      active: '',
      name: 'Produtos mais Vendidos'
    }
  ];

  namePageAux = 'Banner Images';


  @ViewChild('fileInput') fileInput: any;
  constructor(
    public router: Router,
    public acRoute: ActivatedRoute,
    private form: FormBuilder,
    public homeService: HomeApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {

    if (this.namePageAux === 'Produtos mais Vendidos') {
      this.getAllSubProducts();
    } else {
      this.getAllBannerImages();
    }

  }

  insertBannerImages() {
    if (this.imagesToUpload === undefined || this.imagesToUpload.length == 0) {
      return this.toastrService.warning('Insira imagens para cadastrar.', 'Atenção!');
    }

    const formImage = new FormData();
    const files: Array<File> = this.imagesToUpload;

    for (let i = 0; i < files.length; i++) {
      formImage.append('file', files[i]);
    }
    this.imagesToUpload = [];
    this.homeService.addImage(formImage).subscribe(res => {
      if (res != null) {
        this.toastrService.success('Banners inseridos.', 'Sucesso!');
        return this.ngOnInit();
      }
    });
  }

  handleFileSelect(fileInput: any) {
    if (fileInput.target.files.length > 3) { return this.toastrService.warning('Maximo de 3 imagens permitidas!', 'Atenção!'); }
    else this.imagesToUpload = Array.from(fileInput.target.files);
  }

  removeFileInsert(index: number) {
    return this.imagesToUpload.splice(index, 1);
  }

  updateBannerImages() {
    if (this.rowsImagesObj.length < 3 || this.rowsImagesObj > 3) { return this.toastrService.warning('O banner deve conter 3 imagens!', 'Atenção!'); }
    this.homeService.putImage(this.formData).subscribe(res => {
      if (res != null) {
        this.toastrService.success('Banners Atualizados.', 'Sucesso!');
        return this.ngOnInit();
      }
    });
  }

  handleUpdateFile(fileInput: any) {
    const totalImgInput = fileInput.target.files.length;

    if (this.rowsImagesObj != undefined) {
      let totalImgs = this.rowsImagesObj.length;
      if (totalImgs + totalImgInput > 3 || totalImgs + totalImgInput < 3) { return this.toastrService.warning('O banner deve conter 3 imagens!', 'Atenção!'); }
    }

    if (totalImgInput > 3) { return this.toastrService.warning('Maximo de 3 imagens permitidas!', 'Atenção!'); }

    let arrImageInput = Array<any>();
    arrImageInput = Array.from(fileInput.target.files);

    this.asyncForEach(arrImageInput);
  }

  async asyncForEach(array) {
    for (let i = 0; i < array.length; i++) {
      const reader = new FileReader();
      await reader.readAsDataURL(array[i]);

      this.formData.append('file', array[i]);
      reader.onload = (event: any) => {
        this.rowsImagesObj.push({ url: event.target.result });
      };
    }
  }

  trackByFn(index) {
    return index;
  }

  getAllSubProducts() {
    this.homeService.getAllSubProducts().subscribe((res) => {
      if (res != null) {
        this.subProducts = res;
      }
    });
  }

  getAllBannerImages() {
    this.homeService.getHomeImages().subscribe((res) => {
      if (res != null) {
        this.rowsImagesObj = res;
        this.LoadCurrentImg = true;
        this.imgSRC = res.map(x => x.location_aws);
      }
    });
  }

  removeFile(index: number, file) {
    console.log(file);
    if (index !== -1) {
      const size = this.rowsImagesObj.splice(index, 1);
      size.forEach(x => this.formData.append('key', file.key_aws), this.formData.append('id', file.id));
    }
  }

  changePage(namePage: string) {
    if (namePage === 'Banner Images') {
      this.pageArr[1].active = '';
      this.pageArr[0].active = 'active';
      this.namePageAux = 'Banner Images';
    } else {
      this.pageArr[0].active = '';
      this.pageArr[1].active = 'active';
      this.namePageAux = 'Produtos mais Vendidos';
    }
  }
}