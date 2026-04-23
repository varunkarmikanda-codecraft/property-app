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
    lastName: new FormControl('')
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
}
