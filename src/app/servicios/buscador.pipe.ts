import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;
    
    args = args.toLowerCase();
    return value.filter((item:any)=>{
     return item.toLowerCase().includes(args);

    });
  }

}
