import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryName!: string;
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  
  ngOnInit(): void {
    // Get the category from the route parameters
    this.route.params.subscribe((params) => {
      this.categoryName = params['category'] === 'menClothing' ? "men's clothing" : params['category'] === 'womenClothing' ? "women's clothing" : params['category'];
      this.fetchProductsByCategory();
    });
  }

  fetchProductsByCategory(): void {
    this.productService.getProductsByCategoryName(this.categoryName).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}
