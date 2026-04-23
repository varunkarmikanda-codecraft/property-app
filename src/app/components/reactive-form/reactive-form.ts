import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  name = new FormControl('');

  updateName() {
    this.name.setValue('Varun');
  }
}
