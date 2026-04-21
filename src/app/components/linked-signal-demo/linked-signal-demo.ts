import {Component, ChangeDetectionStrategy, signal, computed, linkedSignal, effect} from '@angular/core';

@Component({
  selector: 'app-linked-signal-demo',
  template: `
    <div class="user-profile">
      <h1>User Dashboard</h1>
      <div class="status-indicator" [class]="userStatus()">
        <span class="status-dot"></span>
        Status: {{ userStatus() }}
      </div>

      <div class="status-info">
        <div class="notifications">
          <strong>Notifications:</strong>
          <!-- TODO: Replace 'Loading...' with @if block using notificationsEnabled() -->
           
              <strong>Notifications:</strong>
              @if (notificationPreference()) {
                Enabled
              } @else {
                Disabled
              }
              <button (click)="toggleNotifications()" class="override-btn">
                @if (notificationPreference()) {
                  Disable
                } @else {
                  Enable
                }
              </button>
            
        </div>
        <div class="message">
          <strong>Message:</strong>
          <!-- TODO: Replace 'Loading...' with {{ statusMessage() }} -->
           {{ statusMessage() }}
        </div>
        <div class="working-hours">
          <strong>Within Working Hours:</strong>
          <!-- TODO: Replace 'Loading...' with @if block using isWithinWorkingHours() -->
           @if(isWithinWorkingHours())  {
            Yes
           } @else {
            No
           }
        </div>
      </div>

      <div class="status-controls">
        <button (click)="goOnline()" [disabled]="userStatus() === 'online'">Go Online</button>
        <button (click)="goAway()" [disabled]="userStatus() === 'away'">Set Away</button>
        <button (click)="goOffline()" [disabled]="userStatus() === 'offline'">Go Offline</button>
        <button (click)="toggleStatus()" class="toggle-btn">Cycle Status</button>
      </div>
    </div>
  `,
  styleUrl: './linked-signal-demo.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkedSignalDemo {
  userStatus = signal<'online' | 'away' | 'offline'>('offline');
  notificationPreference = signal<boolean>(this.userStatus() === "online")

  // notificationEffect = effect(() => {
  //   if(this.userStatus() === "online") {
  //     this.notificationPreference.set(true);
  //   } else {
  //     this.notificationPreference.set(false)
  //   }
  // })

  constructor() {
      effect(() => {
      if(this.userStatus() === "online") {
        this.notificationPreference.set(true);
      } else {
        this.notificationPreference.set(false)
      }
    })
  }

  // TODO: Create notificationsEnabled computed signal that returns true when status is 'online'
  // notificationsEnabled = computed(() => {
  //   return this.userStatus() === 'online';
  // })

  // TODO: Create statusMessage computed signal that returns appropriate message for each status
  statusMessage = computed(() => {
    const status = this.userStatus();
    switch (status) {
      case 'online':
        return 'Available for meetings and messages';
      case 'away':
        return 'Temporarily away, will respond soon';
      case 'offline':
        return 'Not available, check back later';
      default:
        return 'Status unknown';
    }
  })

  // TODO: Create isWithinWorkingHours computed signal that calculates if user is within working hours
  isWithinWorkingHours = computed(() => {
    const now = new Date();
    const hour = now.getHours();
    const isWeekday = now.getDay() > 0 && now.getDay() < 6;
    return isWeekday && hour >= 9 && hour < 17 && this.userStatus() !== 'offline';
  })

  goOnline() {
    this.userStatus.set('online');
    // this.notificationPreference.set(true)
  }
  
  goAway() {
    this.userStatus.set('away');
    // this.notificationPreference.set(false)
  }
  
  goOffline() {
    this.userStatus.set('offline');
    // this.notificationPreference.set(false)
  }
  
  toggleStatus() {
    const current = this.userStatus();
    switch (current) {
      case 'offline':
        this.userStatus.set('online');
        // this.notificationPreference.set(true)
        break;
      case 'online':
        this.userStatus.set('away');
        // this.notificationPreference.set(false)
        break;
      case 'away':
        this.userStatus.set('offline');
        // this.notificationPreference.set(false)
        break;
    }
  }

  toggleNotifications() {
    // this.notificationsEnabled.update(prev => !prev);

    this.notificationPreference.update(prev => !prev);
  }
}
