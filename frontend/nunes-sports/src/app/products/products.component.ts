import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor (
    private productsService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.list().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  add() {
    this.router.navigate(['products/new']);
  }

  edit(uuid: string) {
    this.router.navigate(['products/new'], { queryParams: { 'editing-uuid': uuid } });
  }

  delete(product: Product) {
    if (!confirm(`Tem certeza que quer excluir o produto: ${product.name}?`)) return;

    this.productsService.delete(product.uuid).subscribe({
      next: (_) => {
        alert('Produto excluído com sucesso!');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadProducts();
      },
    });
  }

}
