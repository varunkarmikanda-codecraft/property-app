import { Component, linkedSignal, signal } from '@angular/core';

interface ShippingMethod {
  id: number;
  name: string;
}

@Component({
  selector: 'app-shopping-selection',
  imports: [],
  templateUrl: './shopping-selection.html',
  styleUrl: './shopping-selection.css',
})
export class ShoppingSelection {

  shippingOptions = signal<string[]>([
    'Ground',
    'Air',
    'Sea'
  ]);

  userSelectedShippingOptions = linkedSignal(() => this.shippingOptions()[0]);

  changeShippingOptions() {
    this.shippingOptions.set([
      'Email',
      'Sea',
      'Postal Service',
    ])
  }

  handleUserInput(event: Event)  {
    let userSelectedValue = (event.target as HTMLInputElement).value
    console.log(userSelectedValue)
    this.userSelectedShippingOptions.set(userSelectedValue);
  }

}
