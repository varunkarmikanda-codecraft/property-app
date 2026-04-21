import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LocationDetails } from './components/location-details/location-details';
import { Counter } from './components/counter/counter';
import { LinkedSignalDemo } from './components/linked-signal-demo/linked-signal-demo';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: LocationDetails,
    title: 'Home details',
  },
  {
    path: 'counter',
    component: Counter,
    title: "Counter"
  },
  {
    path: 'linked-signal',
    component: LinkedSignalDemo,
    title: 'Linked signal demo'
  }
];
