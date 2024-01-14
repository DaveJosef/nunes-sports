import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  productsForm = this.fb.group({
    code: [],
    name: [],
    description: [],
    price: [],
  });
  uuid: string = '';

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.uuid = params.get('editing-uuid') ?? '';
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  submit() {
    const product = {
      code: this.productsForm.get('code')?.value ?? '',
      name: this.productsForm.get('name')?.value ?? '',
      description: this.productsForm.get('description')?.value ?? '',
      price: this.productsForm.get('price')?.value ?? 0,
    } as Product;

    if (!this.uuid) {
      this.productsService.add(product).subscribe({
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.router.navigate(['products']);
        }
      });
      return;
    }
    this.productsService.update(this.uuid, product).subscribe({
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['products']);
      }
    });
  }

}
