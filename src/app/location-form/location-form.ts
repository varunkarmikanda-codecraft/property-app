import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-form',
  imports: [],
  templateUrl: './location-form.html',
  styleUrl: './location-form.css',
})
export class LocationForm {
  router = inject(Router);

  shouldShowPanel = signal<boolean>(false)

  ngOnInit() {
    this.showPanel();
  }

  showPanel() {
    this.shouldShowPanel.set(true);
  }

  hidePanel() {
    this.shouldShowPanel.set(false);
  }

  closePanel() {
    this.router.navigate(['../'])
  }
}
