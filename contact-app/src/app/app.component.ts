import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-app';
  showNavbar = true;
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.url !== '/login')
    ).subscribe(show => this.showNavbar = show);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
