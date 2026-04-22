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

  locationServiceData = linkedSignal<HousingLocationData[]>(() => {
    const locationSignal = this.locationService.getAllLocation();
    const viewAllLocations = locationSignal().map(location => ({
        ...location, selected: false
      }))
      return viewAllLocations;
    });

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
      const viewModels = this.locationServiceData().map(vm => {
        const newVm = { ...vm };
        newVm.selected = false;
        return newVm;
      })
      this.locationServiceData.set(viewModels);
    } else {
      // const viewModels = [...this.locationServiceData()];
      // let selectedViewModel = viewModels.find(vm => vm.id === housingLocationInfo.id);
      // if(selectedViewModel) {
      //   selectedViewModel.selected = !selectedViewModel.selected;
      // }

      const viewModel = this.locationServiceData().map((vm) => {
        if(vm.id === housingLocationInfo.id) {
          const newVm = { ...vm};
          newVm.selected = !newVm.selected;
          return newVm;
        }
        return vm
      })
    }
  }

  handleCheckbox() {
    this.mode.update(prev => prev === "normal" ? 'edit' : "normal")

    if(this.mode() === 'normal'){
      this.locationServiceData.update(list => list.map(x => ({ ...x, selected: false })));
    }
  }

  addHousingLocation() {

    console.log("Starting to add housing location...")

    const data: HousingLocationInfo = {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true,
    }

    this.locationService.addLocation(data)
  }

}
