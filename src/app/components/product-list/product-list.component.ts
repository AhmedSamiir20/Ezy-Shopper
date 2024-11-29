import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  featuredProducts: Product[] = [];
  allProducts: Product[] = [];
  selectedProduct: Product | null = null;
  categories: string[] = [];
  productsByCategory: Product[] = [];
  loadingFeatured = true;
  loadingAll = true;
  loadingCategories = true;
  loadingProductsByCategory = true;

  private productService = inject(ProductService);
  productId: number = 1;

  constructor(private route: ActivatedRoute) { }

 
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.productId = params['id']; // Get the product ID from the route
      // Fetch product details using the productId
    });
    // Get all products
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts = products;
      this.loadingAll = false;
    });

    // Get product by ID (Example: Fetching product with ID '1')
    this.productService.getProductById('1').subscribe(product => {
      this.selectedProduct = product;
    });

    // Get all categories
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.loadingCategories = false;
    });

    // Get products by category name (Example: Fetching products in 'electronics' category)
    this.productService.getProductsByCategoryName('electronics').subscribe(products => {
      this.productsByCategory = products;
      this.loadingProductsByCategory = false;
    });
  }
}
