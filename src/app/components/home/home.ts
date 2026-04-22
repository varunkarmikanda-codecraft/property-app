import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { LocationService } from '../../services/location-service';
import { MockLocationService } from '../../services/mock-location.service';
import { Router } from '@angular/router';

type HousingLocationData = HousingLocationInfo & {
  selected: boolean;
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

  locationServiceData = linkedSignal<HousingLocationData[]>(() => this.locationService.getAllLocation().map(location => ({
    ...location, selected: false
  })));

  visibleItems = computed(() => this.locationServiceData().filter(x => !this.locationService.isDeleted(x.id)));
  selectedCount = computed(() => this.locationServiceData().filter(x => x.selected && !this.locationService.isDeleted(x.id)).length);
  deletedCount = computed(() => this.locationService.getDeletedIds().length);

  handleSelectionChange(event: { id: number; selected: boolean }) {
    this.locationServiceData.update(list =>
      list.map(x => x.id === event.id && !this.locationService.isDeleted(x.id) ? { ...x, selected: event.selected } : x)
    );
  }

  deleteSelected() {
    const selectedIds = this.locationServiceData()
      .filter(x => x.selected)
      .map(x => x.id);
    
    this.locationService.deleteItems(selectedIds);
    
    this.locationServiceData.update(list =>
      list.map(x => selectedIds.includes(x.id) ? { ...x, selected: false } : x)
    );
  }

  restoreOriginal() {
    this.locationService.restoreItems();
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
