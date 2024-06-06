import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() label: string = "";
  @Input() className: string = "";
  @Input() kind: "primary" | "secondary" | "tertiary" = "primary";

  @Output() onClick = new EventEmitter();

  onClickEvent(e: any): void {
    e.preventDefault();
    this.onClick.emit(e);
  }
}
