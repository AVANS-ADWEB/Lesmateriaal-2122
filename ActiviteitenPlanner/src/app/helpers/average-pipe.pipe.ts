import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averagePipe'
})
export class AveragePipePipe implements PipeTransform {

  transform(items: any[], attr: string): number {
    let arr = items.map(i => i[attr])
    let avg = arr.reduce((a,b) => a + b, 0) / arr.length;
    return avg;
  }

}
