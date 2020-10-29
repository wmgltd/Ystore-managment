import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products-list/products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { ShipmentsListComponent } from './pages/shipments/shipments-list/shipments-list.component';
import { AddShipmentComponent } from './pages/shipments/add-shipment/add-shipment.component';
import { EditShipmentComponent } from './pages/shipments/edit-shipment/edit-shipment.component';
import { EditCouponComponent } from './pages/coupons/edit-coupon/edit-coupon.component';
import { AddCouponComponent } from './pages/coupons/add-coupon/add-coupon.component';
import { CouponsListComponent } from './pages/coupons/coupons-list/coupons-list.component';
import { EditSettingsComponent } from './pages/settings/edit-settings/edit-settings.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { DeliveryTypeComponent } from './pages/settings/delivery-type/delivery-type.component';
import { ExternalLinkComponent } from './pages/settings/external-link/external-link.component';
import { CategoryComponent } from './pages/settings/category/category.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth/signup',
    component: SignupComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedAuth: false
    }
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      expectedAuth: true
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
      },
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
      {
        path: 'shipments',
        component: ShipmentsListComponent,
        data: { title: 'List of shipments' }
      },
      {
        path: 'add-shipment',
        component: AddShipmentComponent,
        data: { title: 'Add shipment' }
      },
      {
        path: 'edit-shipment/:id',
        component: EditShipmentComponent,
        data: { title: 'Edit shipment' }
      },
      {
        path: 'coupons',
        component: CouponsListComponent,
        data: { title: 'List of coupons' }
      },
      {
        path: 'add-coupon',
        component: AddCouponComponent,
        data: { title: 'Add coupon' }
      },
      {
        path: 'edit-coupon/:id',
        component: EditCouponComponent,
        data: { title: 'Edit coupon' }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'List of settings' },
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'company-details'
        },
        {
          path: 'company-details',
          component: EditSettingsComponent
        }, {
          path: 'delivery-type',
          component: DeliveryTypeComponent
        }, {
          path: 'external-link',
          component: ExternalLinkComponent
        }, {
          path: 'category',
          component: CategoryComponent
        }]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
