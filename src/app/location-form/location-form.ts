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
  locationService: LocationService = inject(LocationService)
  router = inject(Router);
  activeRoute = inject(ActivatedRoute)

  shouldShowPanel = signal<boolean>(false)

  locationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormGroup({
      city: new FormControl('', [Validators.required, Validators.minLength(5)]),
      state: new FormControl('', [Validators.required, Validators.minLength(5)]),
    }),
    availableUnits: new FormControl('', [Validators.required]),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
    photo: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    this.showPanel();
  }

  showPanel() {
    this.shouldShowPanel.set(true);
  }

  hidePanel() {
    this.shouldShowPanel.set(false);
  }

  closePanel() {
    this.router.navigate(['../'])
  }

  submitForm() {
    if(this.locationForm.valid){
      const formData = this.locationForm.value;
      const locationData: HousingLocationInfo = {
        id: 0,
        name: formData.name ?? '',
        city: formData.location?.city ?? '',
        state: formData.location?.state ?? '',
        availableUnits: Number(formData.availableUnits) ?? 0,
        wifi: formData.wifi ?? false,
        laundry: formData.laundry ?? false,
        photo: formData.photo ?? ''
      }
      this.locationService.addLocation(locationData)
    }
  }

  fillDummyData() {
    this.locationForm.setValue({
      name: 'City center',
      location: {
        city: 'Mangalore',
        state: 'Karnataka'
      },
      availableUnits: '1',
      wifi: true,
      laundry: null,
      photo: "https://angular.dev/assets/images/tutorials/common/webaliser-_TPTXZd9mOo-unsplash.jpg"
    })
  }

  getError(controlPath: string) {
    const control = this.locationForm.get(controlPath);
    return (control?.touched && !control.valid);
  }
}
