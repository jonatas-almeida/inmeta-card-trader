import { Component } from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Login from '../../../interfaces/Login';
import { AlertService } from '../../../components/alert/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private fb: FormBuilder,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Faz o login do usuário
  async loginUser(): Promise<void> {
    if(this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe((res) => {
        this.alertService.open({
            id: 'alert-component',
            label: 'Sucesso!',
            description: 'Usuário logado com sucesso!',
            kind: "success"
        });
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
}
