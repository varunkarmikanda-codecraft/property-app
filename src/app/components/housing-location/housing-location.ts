import { Component, inject, input, output } from '@angular/core';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { LocationService } from '../../services/location-service';
import { MockLocationService } from '../../services/mock-location.service';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
  providers: [{ provide: LocationService, useClass: MockLocationService }],
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();
  onLocationClick = output<HousingLocationInfo>();
  locationService = inject(LocationService);

  showWifi = false;

  handleClick(event: MouseEvent) {
    if (this.housingLocation().wifi) {
      this.showWifi = !this.showWifi;
    }

    console.log(event.target);

    console.log(`${this.housingLocation().name} is clicked`);
    this.onLocationClick.emit(this.housingLocation());
  }

  // ngOnInit(){
  //   console.log(this.housingLocation())
  // }
}
