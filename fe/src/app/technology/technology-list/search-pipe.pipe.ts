import { Pipe, PipeTransform } from '@angular/core';
import {Technology} from '../../technology.model';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  // really simple search for title
  transform(technologies, searchValue: string) {
    if (searchValue === '') {
      return technologies;
    }
    const returnObjects: Technology[] = [];
    const searchStr = searchValue.toLowerCase();
    for (const technology of technologies) {
      // check title
      const name = technology.name.toLowerCase();
      if (name.includes(searchStr)) {
        returnObjects.push(technology);
        continue;
      }
    }
    return returnObjects;
  }

}
