import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { IAddProduct } from '../components/product-details/product-details.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getAllCategories(): Observable<any>{
    return this.http.get<String[]>(`${this.apiUrl}/categories`)
  }

  getProductsByCategoryName(categoryName: String): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryName}`);
  }

  addProductToCart(product:IAddProduct): Observable<IAddProduct>{
    return this.http.post<IAddProduct>(`https://fakestoreapi.com/carts`,product);
  }
}
