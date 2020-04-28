import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products-list/products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    data: { title: 'Add product' }
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    data: { title: 'Edit product' }
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
