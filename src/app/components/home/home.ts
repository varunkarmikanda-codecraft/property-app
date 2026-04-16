import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { LocationService } from '../../services/location-service';
import { MockLocationService } from '../../services/mock-location.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [{ provide: LocationService, useClass: LocationService }],
})
export class Home {
  locationService: LocationService = inject(LocationService);

  constructor() {
    this.locationService = inject(LocationService)  
  }
  
  housingLocationList: any;

  handleLocationClick(housingLocationInfo: HousingLocationInfo) {
    console.log(`Home ${housingLocationInfo.name} is clicked`);
    // const index = this.housingLocationList.findIndex((location: { id: number; }) => location.id === housingLocationInfo.id);

    // if (index !== -1) {
    //   const [item] = this.housingLocationList.splice(index, 1);

    //   this.housingLocationList = [item[0], ...this.housingLocationList];
    // }
    // // this.locationService = inject(LocationService)
  }
}
