import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import User from '../../interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user?: User;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  async getCurrentUser(): Promise<void> {
    this.userService.getUserInformation().subscribe((res) => {
      this.user = res;
      console.log(this.user);
    }, error => {
      console.log(error);
    });
  }

}
