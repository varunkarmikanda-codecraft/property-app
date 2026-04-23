import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {

  formBuilder = inject(FormBuilder);

  myProfileForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(0)]],
    lastName: [''],
    email: ['', [Validators.email]],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    })
  })

  name = new FormControl('');

  // myProfileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),
  //   }),
  // })

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
      firstName: 'NitroX',
      address: {
        zip: '575008',
      },
    });
  }

  setProfile() {
    this.myProfileForm.setValue({
      firstName: 'Varun',
      lastName: 'Karmikanda', 
      email: 'varun@gmail.com',
      address: {
        street: null,
        city: 'Mangalore',
        state: 'Karnataka',
        zip: '575008'
      }
    })
  }
}
