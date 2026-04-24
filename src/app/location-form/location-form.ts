import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../services/location-service';
import { HousingLocationInfo } from '../models/housing-location-info';

@Component({
  selector: 'app-location-form',
  imports: [ReactiveFormsModule],
  templateUrl: './location-form.html',
  styleUrl: './location-form.css',
})
export class LocationForm {
  locationService: LocationService = inject(LocationService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);

  existingId = signal<number>(-1);

  shouldShowPanel = signal<boolean>(false);

  locationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormGroup({
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    }),
    availableUnits: new FormControl('', [Validators.required]),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
    photo: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.showPanel();

    const id = this.activeRoute.parent?.snapshot.paramMap.get('id');
    if (!id) return;

    const existingLocationDetails = this.locationService.getLocationForId(Number(id));
    if (!existingLocationDetails) return;

    this.existingId.set(existingLocationDetails.id);

    this.locationForm.patchValue({
      name: existingLocationDetails.name,
      location: {
        city: existingLocationDetails.city,
        state: existingLocationDetails.state,
      },
      availableUnits: String(existingLocationDetails.availableUnits),
      wifi: existingLocationDetails.wifi,
      laundry: existingLocationDetails.laundry,
      photo: existingLocationDetails.photo,
    });
  }

  showPanel() {
    this.shouldShowPanel.set(true);
  }

  hidePanel() {
    // this.shouldShowPanel.set(false);
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  closePanel() {
    if (this.locationForm.dirty) {
      const confirmClose = window.confirm('You have unsaved changes. Do you want to close?');
      if (!confirmClose) return;
    }
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  submitForm() {
    if (!this.locationForm.valid) return;

    const formData = this.locationForm.value;
    const locationData: HousingLocationInfo = {
      id: this.existingId() !== -1 ? this.existingId() : -1,
      name: formData.name ?? '',
      city: formData.location?.city ?? '',
      state: formData.location?.state ?? '',
      availableUnits: Number(formData.availableUnits) ?? 0,
      wifi: formData.wifi ?? false,
      laundry: formData.laundry ?? false,
      photo: formData.photo ?? '',
    };

    if (this.existingId() !== -1) {
      this.locationService.updateLocation(locationData);
    } else {
      this.locationService.addLocation(locationData);
    }

    this.hidePanel();
  }

  fillDummyData() {
    this.locationForm.setValue({
      name: 'City center',
      location: {
        city: 'Mangalore',
        state: 'Karnataka',
      },
      availableUnits: '1',
      wifi: true,
      laundry: null,
      photo:
        'https://angular.dev/assets/images/tutorials/common/webaliser-_TPTXZd9mOo-unsplash.jpg',
    });
  }

  getError(controlPath: string) {
    const control = this.locationForm.get(controlPath);
    return control?.touched && !control.valid;
  }
}
