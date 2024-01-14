import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string = `${environment.api_url}/products`;

  constructor(
    private http: HttpClient,
  ) { }

  add(product: Product) {
    return this.http.post<Product>(this.url, product);
  }

  find(uuid: string) {
    return this.http.get<Product>(`${this.url}/${uuid}`);
  }

  list() {
    return this.http.get<Product[]>(this.url);
  }

  update(uuid: string, product: Product) {
    return this.http.patch<Product>(`${this.url}/${uuid}`, product);
  }

  delete(uuid: string) {
    return this.http.delete<void>(`${this.url}/${uuid}`);
  }

}
