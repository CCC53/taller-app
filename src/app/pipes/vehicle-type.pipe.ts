import { Pipe, PipeTransform } from '@angular/core';
import { validVehicles } from '../types/vehicles';

@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {

  transform(type: validVehicles): string {
    switch (type) {
      case validVehicles.PICKUP:
        return 'Pickup'
      case validVehicles.SEDAN:
        return 'Sedán'
      case validVehicles.SUV:
        return 'SUV'
      case validVehicles.TORTON:
        return 'Torton'
      case validVehicles.TRAILER:
        return 'Trailer'
    }
  }

}
