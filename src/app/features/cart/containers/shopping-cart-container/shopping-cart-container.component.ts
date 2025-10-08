import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { CartService } from '../../../../services/cart.service';
import { ProductService } from '../../../../services/product.service';
import { CartItem } from '../../../../models/cart-item.model';
import { Product } from '../../../../models/product.model';

interface CartItemWithProduct extends CartItem {
  productDetails: Product;
}

@Component({
  selector: 'app-shopping-cart-container',
  imports: [CommonModule, ShoppingCartComponent],
  template: `
    <app-shopping-cart
      [items]="cartItemsWithProducts()"
      (updateQuantity)="onUpdateQuantity($event)"
      (removeItem)="onRemoveItem($event)"
      (clearCart)="onClearCart()">
    </app-shopping-cart>
  `
})
export class ShoppingCartContainerComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  private cartItems = this.cartService.getCartItems();
  private products = this.productService.products;

  cartItemsWithProducts = computed(() => {
    return this.cartItems().map(item => ({
      ...item,
      productDetails: this.products().find(p => p.id === item.product)!
    }));
  });


  // cartItems$ = combineLatest([
  //   this.cartService.getCartItems(),
  //   this.productService.getProducts()
  // ]).pipe(
  //   map(([cartItems, products]): CartItemWithProduct[] => {
  //     return cartItems.map(item => ({
  //       ...item,
  //       productDetails: products.find(p => p.id === item.product)!
  //     }));
  //   })
  // );

  onUpdateQuantity(event: { productId: number; quantity: number }): void {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}