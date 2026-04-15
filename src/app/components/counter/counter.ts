import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count = 0;

  getCount() {
    return this.count;
  }

  setCount(count: string) {
    this.count = Number(count);
  }
  
  incrementCounter() {
    this.count++;
  }
  
  decreaseCounter() {
    this.count--;
  }
}
