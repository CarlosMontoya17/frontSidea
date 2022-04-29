import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarciber'
})
export class BuscarciberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;
    
    args = args.toLowerCase();
    return value.filter((item:any)=>{
     return item['nombre'].toLowerCase().includes(args);

    });
  }

}
