import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  // Inputs
  @Input() label: string = "";
  @Input() className: string = '';
  @Input() placeholder: string = "";
  @Input() value: string = "";
  @Input() type: string = "text";
  @Input() disabled: boolean = false;

  // Outputs
  @Output() onClick = new EventEmitter();
  @Output() onInput = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();

  // Valor interno do input
  private innerValue: string = '';

  // Métodos para controlar o valor
  onChangeCallback = (value: any) => {};
  onTouchCallback = () => {};

  writeValue(value: any): void {
    if (value) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

  // Método chamado quando o valor do input muda
  onInputChange(event: any): void {
    let inputFieldValue = event?.target.value;
    
    this.innerValue = inputFieldValue;
    this.onChangeCallback(inputFieldValue);
    this.onInput.emit(inputFieldValue);
  }

  // Método chamado quando o input perde o foco
  onBlurEvent(): void {
    this.onTouchCallback();
    this.onBlur.emit();
  }
}