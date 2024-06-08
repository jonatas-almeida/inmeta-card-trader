import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.scss'
})
export class TradesComponent {

  trades = new Array();

  constructor(
    private userService: UserService
  ) {}

  async getTrades(): Promise<void> {
    this.userService.getAllTrades(10, 1).subscribe((res) => {
      this.trades = res.list;
    }, error => {
      console.log(error);
    });
  }

}
