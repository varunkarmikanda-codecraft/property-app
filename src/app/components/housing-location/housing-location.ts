import { Component, inject, input, output } from '@angular/core';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { BASE_URL, LocationService } from '../../services/location-service';
import { MockLocationService } from '../../services/mock-location.service';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
  providers: [{ provide: BASE_URL, useValue: "hehe hehe heee"}]
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();
  onLocationClick = output<HousingLocationInfo>();

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
