import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../components/alert/alert.service';
import { CookieService } from 'ngx-cookie-service';

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
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cookieService.delete('token');
  }

  // Faz o login do usuário
  async loginUser(): Promise<void> {
    if(this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe((res) => {
        this.setUserToken(res.token ?? '');

        this.router.navigateByUrl('/dashboard');
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

  private setUserToken(token: string): void {
    this.cookieService.set('token', token, {
      secure: true,
      sameSite: 'Strict'
    });
  }
}
