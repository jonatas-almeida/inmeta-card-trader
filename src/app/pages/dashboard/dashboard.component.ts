import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import User from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import UserCards from '../../interfaces/UserCards';
import Cards from '../../interfaces/Cards';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user?: User;
  userCards = new Array<UserCards>();
  allCards = new Array();
  selectedCards = new Array();

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllCards();
  }

  // Retorna as informações do usuário atual
  async getCurrentUser(): Promise<void> {
    this.userService.getUserInformation().subscribe((res) => {
      this.user = res;
      this.getCurrentUserCards();
    }, error => {
      console.log(error);
    });
  }

  // Retorna as cartas do usuário atual
  async getCurrentUserCards(): Promise<void> {
    this.userService.getUserCards().subscribe((res) => {
      this.userCards = res;
    }, error => {
      console.log(error);
    });
  }

  // Retorna todas as cartas registradas no sistema
  async getAllCards(): Promise<void> {
    this.userService.getAllCards(10, 1).subscribe((res) => {
      this.allCards = res.list;
    }, error => {
      console.log(error);
    });
  }

  // Seleciona as cartas e popula o Array para adicionar cartas para o usuário
  selectCards(card: UserCards): void {
    const index = this.selectedCards.indexOf(card.id);

    if (index === -1) {
      this.selectedCards.push(card.id);
    } else {
      this.selectedCards.splice(index, 1);
    }
  }

}