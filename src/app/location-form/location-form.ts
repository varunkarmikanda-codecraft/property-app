import { Component, HostListener, inject, input, Input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../services/location-service';
import { HousingLocationInfo } from '../models/housing-location-info';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-location-form',
  imports: [ReactiveFormsModule, A11yModule],
  templateUrl: './location-form.html',
  styleUrl: './location-form.css',
  host: {
    '(document:keydown.escape)': 'handleEscape()'
  }
})
export class LocationForm {

  id = input.required<string>()

  locationService: LocationService = inject(LocationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  existingId = signal<number>(-1);

  shouldShowPanel = signal<boolean>(false);

  locationForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    location: this.formBuilder.nonNullable.group({
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    }),
    availableUnits: [0, [Validators.required, Validators.min(0)]],
    wifi: [false],
    laundry: [false],  
    photo: ['', [Validators.required, Validators.pattern('https?://.+')]],
  });

  ngOnInit() {
    this.showPanel();

    if (!this.id()) return;
    console.log(this.id())

    const existingLocationDetails = this.locationService.getLocationForId(Number(this.id()));
    if (!existingLocationDetails) return;

    this.existingId.set(existingLocationDetails.id);

    this.locationForm.patchValue({
      name: existingLocationDetails.name,
      location: {
        city: existingLocationDetails.city,
        state: existingLocationDetails.state,
      },
      availableUnits: existingLocationDetails.availableUnits,
      wifi: existingLocationDetails.wifi,
      laundry: existingLocationDetails.laundry,
      photo: existingLocationDetails.photo,
    });
  }

  showPanel() {
    this.shouldShowPanel.set(true);
    document.body.style.overflow = 'hidden';
  }

  hidePanel() {
    // this.shouldShowPanel.set(false);
    document.body.style.overflow = 'auto';
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  closePanel() {
    if (this.locationForm.dirty) {
      const confirmClose = window.confirm('You have unsaved changes. Do you want to close?');
      if (!confirmClose) return;
    }
    this.router.navigate(['../'], { relativeTo: this.activatedRoute  });
    document.body.style.overflow = 'auto';
  }

  submitForm() {
    if (!this.locationForm.valid) return

    const formData = this.locationForm.getRawValue();
    const locationData: HousingLocationInfo = {
      id: this.existingId() !== -1 ? this.existingId() : -1,
      name: formData.name,
      city: formData.location?.city,
      state: formData.location?.state,
      availableUnits: formData.availableUnits,
      wifi: formData.wifi,
      laundry: formData.laundry,
      photo: formData.photo,
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
      availableUnits: 67,
      wifi: true,
      laundry: false,
      photo:
        'https://angular.dev/assets/images/tutorials/common/webaliser-_TPTXZd9mOo-unsplash.jpg',
    });
  }

  getError(controlPath: string) {
    const control = this.locationForm.get(controlPath);
    return control?.touched && !control.valid;
  }

  handleEscape() {
    console.log('Esc was pressed!');
    this.closePanel(); 
  }
}
