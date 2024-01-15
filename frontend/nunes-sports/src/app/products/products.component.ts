import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';
import { Router } from '@angular/router';
import { prompt, showSuccessMessage } from '../utils/dialog';

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
        alert(error.message);
      }
    });
  }

  add() {
    this.router.navigate(['products/new']);
  }

  edit(uuid: string) {
    this.router.navigate(['products/new'], { queryParams: { 'editing-uuid': uuid } });
  }

  async delete(product: Product) {
    if (!((await prompt(`Tem certeza que quer excluir o produto: ${product.name}?`)).isConfirmed)) return;

    this.productsService.delete(product.uuid).subscribe({
      next: async (_) => {
        await showSuccessMessage('Produto excluído com sucesso!');
      },
      error: (error) => {
        alert(error.message);
      },
      complete: () => {
        this.loadProducts();
      },
    });
  }

}
