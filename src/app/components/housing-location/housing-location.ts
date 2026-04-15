import { Component, input, output } from '@angular/core';
import { HousingLocationInfo } from '../../models/housing-location-info';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
})
export class HousingLocation {

  housingLocation = input.required<HousingLocationInfo>();
  onLocationClick = output<HousingLocationInfo>();

  handleClick() {
    console.log(`${this.housingLocation().name} is clicked`)
  }

  // ngOnInit(){
  //   console.log(this.housingLocation())
  // }
}
