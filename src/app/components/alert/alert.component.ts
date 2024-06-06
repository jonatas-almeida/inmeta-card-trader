import { Component, Input } from '@angular/core';
import { AlertService } from './alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input() id: string = "";
  
  constructor(
    public alertService: AlertService
  ) {}

}
