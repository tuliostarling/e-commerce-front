import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HomeApiService } from '../../../../service/home/home-api.service';
import { SubProductModel, ProductModel } from '../../../../model/product/product';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';
import { ProductService } from '../../../../service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home-controller-list',
  templateUrl: './home-controller-list.component.html',
  styleUrls: ['./home-controller-list.component.css']
})
export class HomeControllerListComponent implements OnInit {
  formHomeProduct: FormGroup;
  productPosition: number;
  productPositionUpdate: number;
  arrFormProducts = [];
  arrPositionProducts = [];
  postionAux: number;

  idType: string;
  nameType: string;
  subProducts: SubProductModel;

  LoadCurrentImg: any;
  imgSRC: any;

  formData: FormData = new FormData();
  imagesToUpload: any;
  rowsImagesObj: any;
  rowsProduct: Array<ProductModel>;
  actualProducts: any;

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
  @ViewChild('positionInput') positionInput: ElementRef;
  constructor(
    public router: Router,
    public acRoute: ActivatedRoute,
    private form: FormBuilder,
    public homeService: HomeApiService,
    private toastrService: ToastrService,
    private productService: ProductService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.getProductsInPromotion();
    this.getActualProductsInHome();
    this.getAllBannerImages();
  }

  insertBannerImages() {
    if (this.imagesToUpload === undefined || this.imagesToUpload.length === 0) {
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
    if (fileInput.target.files.length > 3) {
      return this.toastrService.warning('Maximo de 3 imagens permitidas!', 'Atenção!');
    } else { this.imagesToUpload = Array.from(fileInput.target.files); }
  }

  removeFileInsert(index: number) {
    return this.imagesToUpload.splice(index, 1);
  }

  updateBannerImages() {
    if (this.rowsImagesObj.length < 3 || this.rowsImagesObj > 3) {
      return this.toastrService.warning('O banner deve conter 3 imagens!', 'Atenção!');
    }
    this.homeService.putImage(this.formData).subscribe(res => {
      if (res != null) {
        this.toastrService.success('Banners Atualizados.', 'Sucesso!');
        return this.ngOnInit();
      }
    });
  }

  handleUpdateFile(fileInput: any) {
    const totalImgInput = fileInput.target.files.length;

    if (this.rowsImagesObj !== undefined) {
      const totalImgs = this.rowsImagesObj.length;
      if (totalImgs + totalImgInput > 3 || totalImgs + totalImgInput < 3) {
        return this.toastrService.warning('O banner deve conter 3 imagens!', 'Atenção!');
      }
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

  getProductsInPromotion() {
    this.productService.getAllByPromotions(0).subscribe(res => {
      if (res != null) {
        this.rowsProduct = res.rows;

        this.spinnerService.hide();
      }
    });
  }

  getActualProductsInHome() {
    this.arrPositionProducts = [];

    this.homeService.getHomeProducts().subscribe(res => {
      if (res != null) {
        this.actualProducts = res;

        for (let i = 0; i < this.actualProducts.length; i++) {
          this.arrPositionProducts.push(this.actualProducts[i].position);
        }

        this.spinnerService.hide();
      }
    });
  }

  makeFormHomeProducts(idSubproduct: number) {
    this.productPosition = this.postionAux;

    if (this.productPosition > 1 || this.productPosition < 12) {
      const findPosition = this.arrPositionProducts.find(x => x === this.productPosition);

      if (findPosition !== undefined) {
        this.toastrService.warning('Já existe um produto cadastrado/selecionado nessa posição!', 'Atenção!');
      } else {
        const formProduct = { position: this.productPosition, id_subproduct: idSubproduct };
        this.arrFormProducts.push(formProduct);
        this.arrPositionProducts.push(this.productPosition);
        this.toastrService.success('Produto adicionado na lista para cadastro!', 'Sucesso!');
      }
    } else {
      this.toastrService.warning('Posição deve ser entre 1 e 12!', 'Atenção!');
    }
  }

  insertHomeProduct() {
    if (this.arrFormProducts.length > 12) {
      return this.toastrService.warning('Máximo de 12 produtos!', 'Atenção!');
    } else if (this.actualProducts == null && this.arrFormProducts.length < 4) {
      return this.toastrService.warning('Mínimo de 3 produtos!', 'Atenção!');
    } else {
      this.spinnerService.show();
      return new Promise((resolve, reject) => {
        for (let i = 0; i < this.arrFormProducts.length; i++) {
          this.homeService.addHomeProduct(this.arrFormProducts[i]).subscribe((res) => {
            if (res != null) {
              this.spinnerService.hide();
              this.toastrService.success('Produtos inseridos!', 'Sucesso!');
              this.ngOnInit();
              return resolve(res);
            }

            this.spinnerService.hide();
            this.toastrService.error('Não foi possível inserir os produtos!', 'Erro!');
            return reject(`error`);
          });
        }
      });
    }
  }

  position(position: any) {
    this.postionAux = position.path[0].value;
  }

  updatePositionHomeProduct(id: number) {
    const formPosition = { id: id, position: this.postionAux };

    if (this.postionAux > 1 && this.postionAux < 12) {
      const findPosition = this.arrPositionProducts.find(x => x === this.postionAux);

      if (findPosition === undefined) {
        this.homeService.updatePositionHomeProduct(formPosition).subscribe((res) => {
          if (res != null) {
            return this.toastrService.success('Posição atualizada!', 'Sucesso!');
          }

          return this.toastrService.error('Não foi possível atualizar possição!', 'Erro!');
        });
      } else {
        return this.toastrService.warning('Já existe um produto cadastrado/selecionado nessa posição!', 'Atenção!');
      }
    } else {
      return this.toastrService.warning('Posição deve ser maior que 1 e menor que 12!', 'Atenção!');
    }
  }

  removeHomeProduct(id: number) {
    this.spinnerService.show();
    this.homeService.deleteHomeProduct(id).subscribe((res) => {
      if (res != null) {
        this.spinnerService.hide();
        this.toastrService.success('Produtos deletado da lista!', 'Sucesso!');
        return this.ngOnInit();
      }

      this.spinnerService.hide();
      return this.toastrService.error('Não foi possível deletar produto da lista!', 'Erro!');
    });
  }
}
