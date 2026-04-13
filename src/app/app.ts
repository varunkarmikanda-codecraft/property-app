import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  templateUrl: './app.html',
  // template: `<h1>Hello {{ title() }}</h1>`,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('property-app');
  // protected readonly title = 'property-app';

  // check if the setTimeout, event listener is fired, or a promise got resolved/rejected, network call

  ngOnInit() {
    console.log('App component initialized');
    // this.title.set('property app reloaded')
  }
}
