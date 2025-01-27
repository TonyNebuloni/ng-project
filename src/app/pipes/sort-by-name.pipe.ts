import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {

 transform(products: Product[], asc?: boolean) {
     
    return products.sort((a, b) => {
      return asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  }

}
