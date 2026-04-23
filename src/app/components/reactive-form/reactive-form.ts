import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  name = new FormControl('');

  myProfileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
  })

  updateName() {
    this.name.setValue('Varun');
  }

  handleChange(event: Event) {
    // console.log(this.name.value)
    console.log((event.target as HTMLInputElement).value)
  }

  onSubmit() {
    console.warn(this.myProfileForm.value)
  }

  updateProfile() {
    this.myProfileForm.patchValue({
      firstName: 'Varun',
      address: {
        zip: '575008',
      },
    });
  }

  setProfile() {
    this.myProfileForm.setValue({
      firstName: 'Varun',
      lastName: 'Karmikanda',
      address: {
        street: null,
        city: 'Mangalore',
        state: 'Karnataka',
        zip: '575008'
      }
    })
  }
}
