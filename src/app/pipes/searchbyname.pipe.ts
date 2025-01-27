import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'searchByName',
  standalone: true,
})
export class SearchByNamePipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm) {
      return products;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowerSearchTerm)
    );
  }
}
