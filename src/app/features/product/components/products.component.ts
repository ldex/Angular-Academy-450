import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ShoppingCartContainerComponent } from '../../cart/containers/shopping-cart-container/shopping-cart-container.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, ShoppingCartContainerComponent],
  template: `
    <app-shopping-cart-container></app-shopping-cart-container>
    <div class="container mx-auto p-4">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-4">Products</h1>
        <nav class="flex space-x-4 border-b pb-4">
          <a routerLink="/products"
             routerLinkActive="text-blue-600 border-b-2 border-blue-600"
             [routerLinkActiveOptions]="{exact: true}"
             class="hover:text-blue-600">
            Browse Products
          </a>
          @if (authState$ | async; as auth) {
            @if (auth.isAuthenticated) {
              <a routerLink="/products/new"
                 routerLinkActive="text-blue-600 border-b-2 border-blue-600"
                 class="hover:text-blue-600">
                Add Product
              </a>
            }
          }
        </nav>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class ProductsComponent {
  private authService = inject(AuthService);
  authState$ = this.authService.getAuthState();
}