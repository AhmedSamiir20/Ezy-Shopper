import { Component, NgModule, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SweatalertComponent } from '../sweatalert/sweatalert.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./cart.component.css'],
  providers: [SweatalertComponent]
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  products: any = [];

  constructor(private cartService: CartService, private sweatAlertComponent: SweatalertComponent, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
  this.cartService.getCartItems().subscribe((res) => {
    this.cartItems = res[0];
    const productQuantityMap = this.cartItems.products.reduce((map: any, product: any) => {
      map[product.productId] = product.quantity;
      return map;
    }, {});

    const productRequests = Object.keys(productQuantityMap).map(id =>
      this.productService.getProductById(id).pipe(
        map(product => {
          product.quantity = productQuantityMap[id];
          return product;
        })
      )
    );

    forkJoin(productRequests).subscribe(products => {
      this.products = products;
    });
  });
}

  get totalItems() {
    return this.products.reduce((quantity: any, product: { quantity: any; }) => quantity + product.quantity, 0);
  }

  get totalAmount() {
    return this.products.reduce((quantity: number, product: { price: number; quantity: number; }) => quantity + (product.price * product.quantity), 0);
  }

  removeFromCart(product: any) {
    this.products = this.products.filter((p: any) => p !== product);
  }

  updateTotal() {
    // You can call any method to update totals or perform extra actions
  }

  proceedToCheckout() {
    this.router.navigate(['/main-layout/checkout']);
  }
}