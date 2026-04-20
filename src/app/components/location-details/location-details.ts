import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../services/location-service';
import { HousingLocationInfo } from '../../models/housing-location-info';

@Component({
  selector: 'app-location-details',
  imports: [],
  templateUrl: './location-details.html',
  styleUrl: './location-details.css',
})
export class LocationDetails {
  // We need to bea bale to read the id of the location from the window location for the angular can provide us the activated route
  // and get the object from it and get the dynamic param from the url

  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = -1;

  locationService: LocationService = inject(LocationService);

  location: HousingLocationInfo | undefined;

  router = inject(Router);

  prevDisabled = signal<boolean>(false);
  nextDisabled = signal<boolean>(false);

  constructor() {
    // this.housingLocationId = Number(this.route.snapshot.params['id']);

    // console.log("ID of the location: ",this.housingLocationId)

    // this.location = this.locationService.getLocationForId(this.housingLocationId)

    LocationDetails.count++;
    console.log('Number of instances: ', LocationDetails.count);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.housingLocationId = Number(params['id']);
      this.location = this.locationService.getLocationForId(this.housingLocationId);

      if (this.housingLocationId === 0) {
        this.prevDisabled.set(true);
      } else {
        this.prevDisabled.set(false);
      }
      if (this.housingLocationId >= this.locationService.getAllLocation().length - 1) {
        this.nextDisabled.set(true);
      } else {
        this.nextDisabled.set(false);
      }
    });
  }

  ngOnDestroy() {
    LocationDetails.count--;
  }

  handlePrev(housingLocationInfo: HousingLocationInfo | undefined) {
    if (this.prevDisabled()) return;
    console.log('lololololol');
    if (housingLocationInfo && housingLocationInfo.id >= 0) {
      const prevId = housingLocationInfo.id - 1;
      if (prevId >= 0) {
        this.router.navigate(['details', prevId]);
      }
    }
  }

  handleNext(housingLocationInfo: HousingLocationInfo | undefined) {
    if (this.nextDisabled()) return;
    if (housingLocationInfo) {
      const nextId = housingLocationInfo.id + 1;
      if (nextId < this.locationService.getAllLocation().length) {
        this.router.navigate(['details', nextId]);
      }
    }
  }

  static count = 0;
}
