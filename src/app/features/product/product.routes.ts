import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductDetailsContainerComponent } from './containers/product-details-container/product-details-container.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { authGuard } from '../../guards/auth.guard';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListContainerComponent },
      { path: 'new', title: 'Add Product', component: ProductFormContainerComponent, canActivate: [authGuard] },
      { path: 'edit/:id', title: 'Edit Product', component: ProductFormContainerComponent, canActivate: [authGuard] },
      { path: ':id', title: 'Product Details', component: ProductDetailsContainerComponent }
    ]
  }
];