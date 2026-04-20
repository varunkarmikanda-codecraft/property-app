import { Component, computed, inject, signal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { LocationService } from '../../services/location-service';
import { MockLocationService } from '../../services/mock-location.service';
import { Router } from '@angular/router';

type HousingLocationData = HousingLocationInfo & {
  selected: boolean;
  deleted: boolean;
};

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
  });
  
  // housingLocationList: HousingLocationData[] = [];

  originalLocationServiceInfo = signal<HousingLocationInfo[]>(this.locationService.getAllLocation());

  locationServiceData = signal<HousingLocationData[]>(this.originalLocationServiceInfo().map(location => ({
    ...location, selected: false, deleted: false
  })));

  visibleItems = computed(() => this.locationServiceData().filter(x => !x.deleted));
  selectedCount = computed(() => this.locationServiceData().filter(x => x.selected && !x.deleted).length);
  deletedCount = computed(() => this.locationServiceData().filter(x => x.deleted).length);

  handleSelectionChange(event: { id: number; selected: boolean }) {
    this.locationServiceData.update(list =>
      list.map(x => x.id === event.id && !x.deleted ? { ...x, selected: event.selected } : x)
    );
  }

  deleteSelected() {
    this.locationServiceData.update(list =>
      list.map(x => x.selected ? { ...x, selected: false, deleted: true } : x)
    );
  }

  restoreOriginal() {
    this.locationServiceData.set(this.originalLocationServiceInfo().map(x => ({ ...x, selected: false, deleted: false })));
  }

  handleLocationClick(housingLocationInfo: HousingLocationInfo) {

    if(this.mode() === "normal") {
      this.router.navigate(['details', housingLocationInfo.id])
    }
  }

  handleCheckbox() {
    this.mode.update(prev => prev === "normal" ? 'edit' : "normal")

    if(this.mode() === 'normal'){
      this.locationServiceData.update(list => list.map(x => ({ ...x, selected: false })));
    }
  }

}
