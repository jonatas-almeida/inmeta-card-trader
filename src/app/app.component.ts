import { ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AlertComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements DoCheck {

  constructor(
    public cookieService: CookieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  // Popula os items do menu da Navbar
  menuItemList = new Array(
    {
      label: "Item 1",
      route: "/"
    },
    {
      label: "Item 2",
      route: "/"
    },
    {
      label: "Item 3",
      route: "/"
    },
    {
      label: "Item 4",
      route: "/"
    }
  )
}
