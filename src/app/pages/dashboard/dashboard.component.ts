import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import User from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import UserCards from '../../interfaces/UserCards';
import { ButtonComponent } from '../../components/button/button.component';
import { AlertService } from '../../components/alert/alert.service';
import { FloatingButtonComponent } from '../../components/floating-button/floating-button.component';
import { TradeService } from '../../services/trade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    FloatingButtonComponent  
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user?: User;
  userCards = new Array<UserCards>();
  allCards = new Array();
  selectedCards = new Array();
  trades = new Array();
  modalOpen: boolean = false;

  constructor(
    private userService: UserService,
    private tradeService: TradeService,
    private alertService: AlertService,
    public router: Router
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
      this.getTrades();
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível retornar as informações do usuário, tente novamente mais tarde',
        kind: "danger"
      });
    });
  }

  // Retorna as cartas do usuário atual
  async getCurrentUserCards(): Promise<void> {
    this.userService.getUserCards().subscribe((res) => {
      this.userCards = res.reverse();
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível retornar as cartas, tente novamente mais tarde',
        kind: "danger"
      });
    });
  }

  // Retorna todas as cartas registradas no sistema
  async getAllCards(): Promise<void> {
    this.userService.getAllCards(30, 1).subscribe((res) => {
      if(res.list) {
        for(let i = 0; i < res.list.length; i++) {
          Object.assign(res.list[i], { isActive: false });
        }
      }

      this.allCards = res.list;
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível retornar as cartas, tente novamente mais tarde',
        kind: "danger"
      });
    });
  }

  // Adiciona as cartas para o usuário
  async addCards(): Promise<void> {
    const payload = {
      cardIds: this.selectedCards
    }

    this.userService.addUserCard(payload).subscribe((res) => {
      this.modalOpen = false;
      this.getCurrentUserCards();
      this.alertService.open({
        id: 'alert-component',
        label: 'Sucesso!',
        description: 'Cartas adicionadas ao seu inventário',
        kind: "success"
      });
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível adicionar as cartas no seu invetário, tente novamente mais tarde',
        kind: "danger"
      });
    })
  }

  async getTrades(): Promise<void> {
    this.tradeService.getAllTrades(30, 1).subscribe((res) => {
      this.trades = res.list;
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível retornar as Trades, tente novamente mais tarde',
        kind: "danger"
      });
    });
  }

  // Seleciona as cartas e popula o Array para adicionar cartas para o usuário
  selectCards(card: UserCards, cardIndex: number): void {
    const index = this.selectedCards.indexOf(card.id);

    if (index === -1) {
      this.selectedCards.push(card.id);
      this.allCards[cardIndex].isActive = true;
    } else {
      this.allCards[cardIndex].isActive = false;
      this.selectedCards.splice(index, 1);
    }
  }

}
