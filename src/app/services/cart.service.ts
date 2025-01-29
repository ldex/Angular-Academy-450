import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(productId: number): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product === productId);

    if (existingItem) {
      const updatedItems = currentItems.map(item =>
        item.product === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      this.cartItems.next(updatedItems);
    } else {
      this.cartItems.next([...currentItems, { product: productId, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product !== productId);
    this.cartItems.next(updatedItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item =>
      item.product === productId ? { ...item, quantity } : item
    );
    this.cartItems.next(updatedItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }
}