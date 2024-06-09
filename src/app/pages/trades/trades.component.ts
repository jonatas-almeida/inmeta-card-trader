import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FloatingButtonComponent } from '../../components/floating-button/floating-button.component';
import { TradeService } from '../../services/trade.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../components/alert/alert.service';
import { UserService } from '../../services/user.service';
import UserCards from '../../interfaces/UserCards';
import TradeCards from '../../interfaces/TradeCards';
import User from '../../interfaces/User';
import Trade from '../../interfaces/Trade';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    FloatingButtonComponent
  ],
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.scss'
})
export class TradesComponent implements OnInit, AfterContentInit {

  tradeList = new Array();
  tradeCreationDate = new Date();
  tradeUserCards = new Array();
  tradeGeneralCards = new Array();
  tradeReceivingList = new Array();
  tradeOfferingList = new Array();
  tradeSelectedCards = new Array();
  tradeGeneralSelectedCards = new Array();
  userTrades = new Array();
  userInfo: User;
  currentTradeId: string = '';

  openModal: boolean = false;
  openModalConfirmation: boolean = false;

  constructor(
    private userServices: UserService,
    private tradeService: TradeService,
    private alertService: AlertService
  ) {
    this.userInfo = {
      id: '',
      name: '',
      email: '',
      cards: [
        {
          id: '',
          name: '',
          description: '',
          imageUrl: '',
          createdAt: '',
          isActive: false
        }
      ]
    }
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  ngAfterContentInit(): void {
    this.getTrades();
    this.getAllRegisteredCards();
  }

  // Retorna a informação do usuário atual
  async getUserInfo(): Promise<void> {
    this.userServices.getUserInformation().subscribe((res) => {
      	this.userInfo = res;
    }, error => {
      console.log(error);
    });
  }

  // Retorna todas as Trades
  async getTrades(): Promise<void> {
    this.tradeService.getAllTrades(10, 1).subscribe((res) => {
      this.tradeList = res.list;
      if(this.tradeList) {
        this.userTrades = this.tradeList.filter((trade) => { 
          return trade.userId === this.userInfo.id
        });
      }
      this.getAllUserCards();
    }, error => {
      console.log(error);
    });
  }

  // Retorna todas as cartas do usuário atual
  async getAllUserCards(): Promise<void> {
    this.userServices.getUserCards().subscribe((res) => {
      if(res) {
        for(let i = 0; i < res.length; i++) {
          Object.assign(res[i], {
            isActive: false
          })
        }
      }

      this.tradeUserCards = res;
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível criar retornar as cartas, tente novamente mais tarde',
        kind: "danger"
      });
    });
  }

  // Retorna todas as cartas cadastradas no banco
  async getAllRegisteredCards(): Promise<void> {
    this.userServices.getAllCards(30, 1).subscribe((res) => {
      if(res.list) {
        for(let i = 0; i < res.list.length; i++) {
          Object.assign(res.list[i], {
            isActive: false
          })
        }
      }

      this.tradeGeneralCards = res.list;
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível criar retornar as cartas, tente novamente mais tarde',
        kind: "danger"
      });
    });
  }

  // Cria a nova solicitação
  async createTrade(): Promise<void> {
    const payload: TradeCards = {
      cards: this.tradeSelectedCards
    }

    this.tradeService.createTrades(payload).subscribe((res) => {
      this.getTrades();
      this.alertService.open({
        id: 'alert-component',
        label: 'Sucesso!',
        description: 'Trade criada com sucesso!',
        kind: "success"
      });
      this.openModal = false;
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível criar a Trade, tente novamente mais tarde',
        kind: "danger"
      });
    })
  }

  // Remove uma solicitação de trade
  async removeTrade(): Promise<void> {
    this.tradeService.removeTrade(this.currentTradeId).subscribe(() => {
      this.getTrades();
      this.alertService.open({
        id: 'alert-component',
        label: 'Sucesso!',
        description: 'Trade removida com sucesso!',
        kind: "success"
      });
      this.openModalConfirmation = false;
    }, error => {
      this.alertService.open({
        id: 'alert-component',
        label: 'Erro!',
        description: 'Não foi possível remover a Trade, tente novamente mais tarde',
        kind: "danger"
      });
    });
  }

  // Seleciona as cartas e popula o Array para adicionar cartas para o usuário
  selectCards(type: string, card: UserCards, cardIndex: number): void {
    const userCardsIndex = this.tradeSelectedCards.findIndex(item => item.cardId === card.id);
    const generalCardsIndex = this.tradeGeneralSelectedCards.findIndex(item => item.cardId === card.id);

    if (type === "user-cards") {
      if (userCardsIndex === -1) {
        this.tradeSelectedCards.push(
          {
            cardId: card.id,
            type: "OFFERING"
          }
        );
        this.tradeUserCards[cardIndex].isActive = true;
      } else {
        this.tradeUserCards[cardIndex].isActive = false;
        this.tradeSelectedCards.splice(userCardsIndex, 1);
      }
    } else {
      if (generalCardsIndex === -1) {
        this.tradeSelectedCards.push(
          {
            cardId: card.id,
            type: "RECEIVING"
          }
        );
        this.tradeGeneralCards[cardIndex].isActive = true;
      } else {
        this.tradeGeneralCards[cardIndex].isActive = false;
        this.tradeGeneralSelectedCards.splice(generalCardsIndex, 1);
      }
    }
  }

  // Abre o modal de confirmação
  removeTradeModal(tradeId: string): void {
    this.currentTradeId = tradeId;
    this.openModalConfirmation = true;
  }

  // Converte a data
  public convertDate(date: string): string {
    let unformatedDate = new Date(date).toISOString().split('T')[0].split('-');
    let formatedDate = unformatedDate[2] + '/' + unformatedDate[1] + '/' + unformatedDate[0];

    return formatedDate;
  }

}
