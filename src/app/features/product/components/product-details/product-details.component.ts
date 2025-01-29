import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent {
  @Input() product: Product | null = null;
  @Input() isAuthenticated = false;
  @Output() addToCart = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onAddToCart(productId: number): void {
    this.addToCart.emit(productId);
  }

  onDelete(productId: number): void {
    this.delete.emit(productId);
  }
}