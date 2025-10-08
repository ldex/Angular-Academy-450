import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { AuthService } from '../../../../services/auth.service';
import { Product } from '../../../../models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list-container',
  imports: [CommonModule, ProductListComponent],
  template: `
    <app-product-list
      [products]="products()"
      [error]="error()"
      [loading]="loading()"
      [isAuthenticated]="isAuthenticated()"
      (addToCart)="onAddToCart($event)"
      (refresh)="onRefresh()">
    </app-product-list>
  `
})
export class ProductListContainerComponent implements OnInit {
  private productService = inject(ProductService)
  private cartService = inject(CartService)
  private authService = inject(AuthService)

  products: Signal<Product[]> = this.productService.products
  error = this.productService.error
  loading = this.productService.loading

  private authState = toSignal(this.authService.getAuthState())
  isAuthenticated = computed(() => this.authState()?.isAuthenticated ?? false)

  ngOnInit(): void {
    this.productService.getProducts()
  }

  onAddToCart(productId: number): void {
    this.cartService.addToCart(productId);
  }

  onRefresh(): void {
    this.productService.refreshCache();
  }
}