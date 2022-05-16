import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarhistorial'
})
export class BuscarhistorialPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter((item: any) => {

      var value: any[] = [];

      let value2 = item['curp'].toLowerCase().includes(args);

      value.push(value2);
      return value[0];

    });
  }



}
