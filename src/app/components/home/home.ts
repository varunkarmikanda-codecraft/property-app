import { Component, computed, inject, signal } from '@angular/core';
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

  modeStatus = computed(() => {
    return this.mode() === "normal" ? "NORMAL" : "EDIT"
  })  
  
  housingLocationList: any;

  handleLocationClick(housingLocationInfo: HousingLocationInfo) {

    if(this.mode() === "normal") {
      this.router.navigate(['details', housingLocationInfo.id])
    }
  }

  handleCheckbox(event: Event) {

    // GOOD: If you want to compute new value based on its previous value
    this.mode.update(prev => prev === "normal" ? 'edit' : "normal")
    // BAD
    // this.mode.set(this.mode() === "normal" ? 'edit' : "normal") 
  }

}
