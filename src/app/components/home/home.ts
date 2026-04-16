import { Component, inject, signal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { LocationService } from '../../services/location-service';
import { MockLocationService } from '../../services/mock-location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  locationService: LocationService = inject(LocationService);
  router = inject(Router)

  mode = signal<"normal" | "edit">('normal')
  
  housingLocationList: any;

  constructor() {
    console.log("Constro init")
  }

  handleLocationClick(housingLocationInfo: HousingLocationInfo) {
    console.log(`Home ${housingLocationInfo.name} is clicked`);
    // const index = this.housingLocationList.findIndex((location: { id: number; }) => location.id === housingLocationInfo.id);

    // if (index !== -1) {
    //   const [item] = this.housingLocationList.splice(index, 1);

    //   this.housingLocationList = [item[0], ...this.housingLocationList];
    // }
    // // this.locationService = inject(LocationService)

    // If we locked in the  normal mode navigate the user card ti ckicked property details screen

    this.router.navigate(['details', housingLocationInfo.id])
    console.log("Routing to: ", housingLocationInfo.id)
  }

  handleCheckbox(event: Event) {
    console.log(`MODE: ${this.mode()}\nCheckbox: ${(event.target as HTMLInputElement).checked}`)

    // GOOD: If you want to compute new value based on its previous value
    this.mode.update(prev => prev === "normal" ? 'edit' : "normal")
    // BAD
    // this.mode.set(this.mode() === "normal" ? 'edit' : "normal")



  }

  ngOnInit() {
    console.log("home instanciated")
  }

  ngOnDestroy() {
    console.log("destro")
  }
}
