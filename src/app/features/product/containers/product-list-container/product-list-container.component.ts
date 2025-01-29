import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { AuthService } from '../../../../services/auth.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-list-container',
  imports: [CommonModule, ProductListComponent],
  template: `
    <app-product-list
      [products]="products$ | async"
      [isAuthenticated]="(authState$ | async)?.isAuthenticated || false"
      (addToCart)="onAddToCart($event)"
      (refresh)="onRefresh()">
    </app-product-list>
  `
})
export class ProductListContainerComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  products$: Observable<Product[]>;
  authState$ = this.authService.getAuthState();

  constructor() {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit(): void {}

  onAddToCart(productId: number): void {
    this.cartService.addToCart(productId);
  }

  onRefresh(): void {
    this.productService.refreshCache();
    this.products$ = this.productService.getProducts();
  }
}