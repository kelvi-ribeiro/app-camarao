import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MensagemReduzidaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'mensagemReduzida',
})
export class MensagemReduzidaPipe implements PipeTransform {
  transform(texto:string,truncarEm:number):string{
    if(texto.length>truncarEm){
        return texto.substr(0,truncarEm) + '...'
    }

    return texto

}

}
