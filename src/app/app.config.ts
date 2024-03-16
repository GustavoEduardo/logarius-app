import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { provideNzI18n, pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import br from '@angular/common/locales/br';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideEnvironmentNgxMask } from 'ngx-mask';

registerLocaleData(br);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
    provideNzIcons(),
    provideNzI18n(pt_BR),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideEnvironmentNgxMask(),
    provideToastr(),
    provideAnimations(),
  ],
};
