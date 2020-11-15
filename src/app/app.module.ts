import { SettingsService } from 'src/app/services/settings.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './pages/products/products-list/products.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { ShipmentsListComponent } from './pages/shipments/shipments-list/shipments-list.component';
import { AddShipmentComponent } from './pages/shipments/add-shipment/add-shipment.component';
import { EditShipmentComponent } from './pages/shipments/edit-shipment/edit-shipment.component';
import { EditCouponComponent } from './pages/coupons/edit-coupon/edit-coupon.component';
import { AddCouponComponent } from './pages/coupons/add-coupon/add-coupon.component';
import { CouponsListComponent } from './pages/coupons/coupons-list/coupons-list.component';
import { EditSettingsComponent } from './pages/settings/edit-settings/edit-settings.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { ViewProductComponent } from './pages/products/view-product/view-product.component';
import { DeliveryTypeComponent } from './pages/settings/delivery-type/delivery-type.component';
import { ExternalLinkComponent } from './pages/settings/external-link/external-link.component';
import { CategoryComponent } from './pages/settings/category/category.component';
import { ViewShipmentComponent } from './pages/shipments/view-shipment/view-shipment.component';
import { NullDefaultValueDirectiveDirective } from './directives/null-default-value-directive.directive';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { WelcomeComponent } from './pages/auth/signup/welcome/welcome.component';
import { AcquaintanceComponent } from './pages/auth/signup/acquaintance/acquaintance.component';
import { StoreComponent } from './pages/auth/signup/store/store.component';
import { DetailsComponent } from './pages/auth/signup/details/details.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    ShipmentsListComponent,
    AddShipmentComponent,
    EditShipmentComponent,
    EditCouponComponent,
    AddCouponComponent,
    CouponsListComponent,
    EditSettingsComponent,
    SideMenuComponent,
    ChartComponent,
    SettingsComponent,
    ViewProductComponent,
    DeliveryTypeComponent,
    ExternalLinkComponent,
    CategoryComponent,
    ViewShipmentComponent,
    NullDefaultValueDirectiveDirective,
    DeleteConfirmDialogComponent,
    SignupComponent,
    WelcomeComponent,
    AcquaintanceComponent,
    StoreComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      showUnits: false,
      showSubtitle: false,
    }),
  ],
  providers: [
    [SettingsService],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
