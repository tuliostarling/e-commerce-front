import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  urlCheck = true;

  constructor(router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/' || e.url === '/countdown') {
          this.urlCheck = true;
        } else {
          this.urlCheck = false;
        }
      }
    });
  }
}
