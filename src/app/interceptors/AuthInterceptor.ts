import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  router = inject(Router);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.estaLogado()) {
      const token = this.authService.getTokenLS();

      // Clonar a requisição original e substituir o cabeçalho de autorização
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    } else {
      this.router.navigate(['/login']);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirecionar para a página de login
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          // Exibir mensagem de acesso negado
          // Código para mostrar a mensagem
          this.router.navigate(['/']);
        }

        throw error;
      })
    );
  }
}
