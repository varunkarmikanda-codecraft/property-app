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
  isEditMode = input<boolean>(false);
  isSelected = input<boolean>(false);
  selectedLocation = output<{ id: number, selected: boolean}>();

  handleClick() {
    if(this.isEditMode()) {
      this.selectedLocation.emit({
        id: this.housingLocation().id,
        selected: !this.isSelected()
      });
    }
    this.onLocationClick.emit(this.housingLocation());
  }

  // ngOnInit(){
  //   console.log(this.housingLocation()) 
  // }
}
