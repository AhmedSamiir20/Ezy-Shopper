import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { CartItem } from '../models/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private api: string = 'https://fakestoreapi.com/carts/user/2';

  constructor(private http: HttpClient) {
  }

  // Fetch the cart items (either from API or from the local storage)
  getCartItems(): Observable<any> {
    return this.http.get(this.api); // Replace with your API endpoint for fetching cart items from the backendthis.cartItems; // Returns the local cart items directly
  }
}
