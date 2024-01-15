import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { showWarningMessage } from 'src/app/utils/dialog';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['../products.component.css', './products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  productsForm = this.fb.group({
    code: ['', [
      Validators.required,
      Validators.maxLength(9),
    ]],
    name: ['', [
      Validators.required,
      Validators.maxLength(50),
    ]],
    description: ['', [
      Validators.required,
      Validators.maxLength(200),
    ]],
    price: [0.10, [
      Validators.required,
      Validators.min(0.10),
    ]],
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
        if (this.uuid) this.loadProduct();
      },
      error: (error) => {
        showWarningMessage(error.message);
      },
    });
  }

  loadProduct() {
    this.productsService.find(this.uuid).subscribe({
      next: (product) => {
        this.productsForm.controls['code'].setValue(product.code);
        this.productsForm.controls['name'].setValue(product.name);
        this.productsForm.controls['description'].setValue(product.description);
        this.productsForm.controls['price'].setValue(product.price);
      },
      error: (error) => {
        showWarningMessage(error.message);
      },
    });
  }

  submit() {
    if (!this.productsForm.valid) {
      showWarningMessage('O formulário contém erros, por favor, verifique-o antes de continuar');
      Object.values(this.productsForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const product = {
      code: this.productsForm.get('code')?.value ?? '',
      name: this.productsForm.get('name')?.value ?? '',
      description: this.productsForm.get('description')?.value ?? '',
      price: this.productsForm.get('price')?.value ?? 0,
    } as Product;

    if (!this.uuid) {
      this.productsService.add(product).subscribe({
        error: (error) => {
          showWarningMessage(error.status === 400 ? `Produto com código ${product.code} já existe` : error.message);
        },
        complete: () => {
          this.router.navigate(['products']);
        }
      });
      return;
    }
    this.productsService.update(this.uuid, product).subscribe({
      error: (error) => {
        showWarningMessage(error.message);
      },
      complete: () => {
        this.router.navigate(['products']);
      }
    });
  }

}
