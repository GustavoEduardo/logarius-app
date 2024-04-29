import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Helpers } from '../../shared/helpers';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent extends Helpers {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ){
    super()
  }

  formLogin = this.fb.group({
    login: [null, Validators.required],
    senha: [null, Validators.required]
  })

  loadingBt = false;

  logar(){

    if(this.formLogin.valid){
      this.loadingBt = true;

      const data = {
        login: this.formLogin.value.login!,
        senha: this.formLogin.value.senha!
      }

      this.authService.login(data).subscribe({
        next: (res) =>{
          this.loadingBt = false;
          this.router.navigate(['/'])
        },
        error: (err) =>{
          this.loadingBt = false;
          this.toastrService.error(err.error?.message || 'Falha ao tentar realizar login.')
        }
      })

    }else {

      Object.values(this.formLogin.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

    }

  }

  logout(){
    this.authService.logout();
  }

}
