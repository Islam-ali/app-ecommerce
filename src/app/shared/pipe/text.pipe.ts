import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(text:string,seeMoreIndex:number,index:number): any {
    let output:string
   
    if (seeMoreIndex==index) {
      output = text.slice(0)
       return output
    }
    else {
      output = text.slice(0,60)
       return output
    }
  }

}
