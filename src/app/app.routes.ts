import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LocationDetails } from './components/location-details/location-details';
import { Counter } from './components/counter/counter';
import { LinkedSignalDemo } from './components/linked-signal-demo/linked-signal-demo';
import { ReactiveForm } from './components/reactive-form/reactive-form';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    title: 'Home page',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    // component: LocationDetails,
    loadComponent: () => import('./components/location-details/location-details').then(m =>m.LocationDetails),
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
  },
  {
    path: 'reactive-form',
    // component: ReactiveForm,
    loadComponent: () => import('./components/reactive-form/reactive-form').then(n => n.ReactiveForm),
    title: 'Reactive form'
  }
];
