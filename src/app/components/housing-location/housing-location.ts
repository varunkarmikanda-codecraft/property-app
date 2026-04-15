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

  showWifi = false

  handleClick(event: MouseEvent) {
    if(this.housingLocation().wifi) {
      this.showWifi = !this.showWifi
    }

    console.log(event.target)

    console.log(`${this.housingLocation().name} is clicked`)
    this.onLocationClick.emit(this.housingLocation())
  }

  // ngOnInit(){
  //   console.log(this.housingLocation())
  // }
}
