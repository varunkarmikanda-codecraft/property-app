import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Home } from './components/home/home';
import { Counter } from "./components/counter/counter";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Counter, RouterLinkWithHref],
  templateUrl: './app.html',
  // template: `<h1>Hello {{ title() }}</h1>`,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('property-app');
  router = inject(Router)
  // protected readonly title = 'property-app';

  // check if the setTimeout, event listener is fired, or a promise got resolved/rejected, network call

  ngOnInit() {
    console.log('App component initialized');
    // this.title.set('property app reloaded')
  }

  // handleHome(event: Event) {
  //   console.log("Back to home")
  //   this.router.navigate([''])
  // }
}
