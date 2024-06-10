import { Component } from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import Register from '../../../interfaces/Register';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../components/alert/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  private isPasswordValid: boolean = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private fb: FormBuilder,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Cria um novo usuário
  async createNewUser(): Promise<void> {
    if(this.registerForm.valid && this.isPasswordValid) {
      this.authService.createUser(this.registerForm.value).subscribe((res: Register) => {
        this.alertService.open({
        	id: 'alert-component',
          label: 'Sucesso!',
          description: 'Usuário criado com sucesso!',
          kind: "success"
        });
        this.router.navigateByUrl("/auth/login");
      }, error => {
        this.alertService.open({
          id: 'alert-component',
          label: 'Erro!',
          description: 'Algo deu errado! Tente novamente mais tarde.',
          kind: "danger"
        });
      });
    }
    else {
      this.alertService.open({
        id: 'alert-component',
        label: 'Aviso!',
        description: 'Preencha os campos antes de continuar.',
        kind: "warning"
      });
    }
  }

  verifyPasswordMatch(value: string): boolean {
    if(this.registerForm.get('password')?.value) {
      if(this.registerForm.get('password')?.value === value) {
        this.isPasswordValid = true;
      }
      else {
        this.isPasswordValid = false;
      }
    }
    
    return this.isPasswordValid;
  }

}
