import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

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
