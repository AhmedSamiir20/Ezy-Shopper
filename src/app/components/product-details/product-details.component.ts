import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';

export interface Iproducts {
  productId: string;
  quantity: number;
}

export interface IAddProduct {
  id: string;
  userId: string;
  date: string;
  products: Iproducts[];
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  allProducts: Product[] = [];
  loadingProduct = true;
  loadingRelated = true;
  errorMessage = '';
  addProduct!: IAddProduct;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadRelatedProducts();
  }

  private loadProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          this.loadingProduct = false;
        },
        error: () => {
          this.errorMessage =
            'Error loading product details. Please try again later.';
          this.loadingProduct = false;
        },
      });
    }
  }

  private loadRelatedProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products.slice(1, 4);
        this.loadingRelated = false;
      },
      error: () => {
        this.errorMessage =
          'Error loading related products. Please try again later.';
        this.loadingRelated = false;
      },
    });
  }

  // Increase quantity
  increaseQuantity(): void {
    this.quantity++;
  }

  // Decrease quantity
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Add to Cart function
  addToCart(product: Product): void {
    if (!this.addProduct) {
      this.addProduct = {
        id: '',
        userId: '2', // Example userId, replace with actual user info
        date: new Date().toLocaleDateString(),
        products: [
          {
            productId: product.id,
            quantity: this.quantity,
          },
        ],
      };
    }

    // Update the quantity dynamically
    this.addProduct.products[0].quantity = this.quantity;

    console.log('Add to cart is ', this.addProduct);

    // Call service to add product to cart
    this.productService.addProductToCart(this.addProduct).subscribe({
      next: (res) => {
        this.toaster.success('Add to cart Succcessfully');
        console.log('Response is ', res);
        // Optionally reset quantity after adding to cart
        this.quantity = 1;
      },
      error: (err) => {
        this.errorMessage =
          'Error adding product to cart. Please try again later.';
        this.toaster.error(this.errorMessage);
      },
    });
  }
}
