import { Pipe, PipeTransform } from '@angular/core';
import { validSpareParts } from '../types/spare-parts';

@Pipe({
  name: 'sparePartType'
})
export class SparePartTypePipe implements PipeTransform {

  transform(type: validSpareParts): string {
    return type === validSpareParts.MAINTENANCE ? 'Mantenimiento' : 'Repuesto';
  }

}
