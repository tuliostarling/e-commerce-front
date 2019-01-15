import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from '../../../../service/category/category-api.service';
import { CategoryModel } from '../../../../model/category/category';

import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(
    public apiService: CategoryService,
    public router: Router,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  public rowsCategory: CategoryModel;

  ngOnInit() {
    this.spinnerService.show();
    this.apiService.getListAll().subscribe((data) => {
      this.rowsCategory = data;
      this.spinnerService.hide();
    });
  }

  navToRegsCat() {
    this.router.navigateByUrl('category_register');
  }

  update(id: number) {
    this.router.navigateByUrl('category_edit/' + id);
  }

  delete(id: number) {
    this.spinnerService.show();
    this.apiService.delete(id).subscribe((res) => {
      if (res) {
        this.toastrService.success('Categoria deletada!', 'Sucesso!');
        this.spinnerService.hide();
        return this.ngOnInit();
      }

      this.spinnerService.hide();
      return this.toastrService.error('Erro ao deletar categoria', 'Erro!');
    });
  }
}
