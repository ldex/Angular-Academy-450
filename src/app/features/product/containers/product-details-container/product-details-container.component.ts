import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { AuthService } from '../../../../services/auth.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-details-container',
  imports: [CommonModule, ProductDetailsComponent],
  template: `
    <app-product-details
      [product]="product$ | async"
      [isAuthenticated]="(authState$ | async)?.isAuthenticated || false"
      (addToCart)="onAddToCart($event)"
      (delete)="onDelete($event)">
    </app-product-details>
  `
})
export class ProductDetailsContainerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  product$: Observable<Product>;
  authState$ = this.authService.getAuthState();

  constructor() {
    const productId = Number(this.route.snapshot.params['id']);
    this.product$ = this.productService.getProduct(productId);
  }

  ngOnInit(): void {}

  onAddToCart(productId: number): void {
    this.cartService.addToCart(productId);
  }

  onDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}