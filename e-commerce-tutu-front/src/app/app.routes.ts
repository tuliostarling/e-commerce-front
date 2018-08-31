import { Routes } from '@angular/router';

import { HomeComponent } from './view/common-user/home/home.component';
import { CategoryListComponent } from './view/admin-user/category/category-list/category-list.component';
import { CategoryRegisterComponent } from './view/admin-user/category/category-register/category-register.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'  },
    { path: 'home', component: HomeComponent },
    { path: 'category_list', component: CategoryListComponent },
    { path: 'category_register', component: CategoryRegisterComponent }
]