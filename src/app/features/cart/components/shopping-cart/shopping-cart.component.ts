import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../models/cart-item.model';
import { Product } from '../../../../models/product.model';

interface CartItemWithProduct extends CartItem {
  productDetails: Product;
}

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent {
  @Input() items: CartItemWithProduct[] = [];
  @Output() updateQuantity = new EventEmitter<{ productId: number; quantity: number }>();
  @Output() removeItem = new EventEmitter<number>();
  @Output() clearCart = new EventEmitter<void>();

  calculateTotal(items: CartItemWithProduct[]): number {
    return items.reduce((total, item) =>
      total + (item.productDetails.price * item.quantity), 0
    );
  }

  onUpdateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) return;
    this.updateQuantity.emit({ productId, quantity });
  }

  onRemoveItem(productId: number): void {
    this.removeItem.emit(productId);
  }

  onClearCart(): void {
    this.clearCart.emit();
  }
}