import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './Angular-Material';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardLogistiqueComponent } from './dashboard-logistique/dashboard-logistique.component';
import { DashboardDirectionComponent } from './dashboard-direction/dashboard-direction.component';
import { DashboardCommerceComponent } from './dashboard-commerce/dashboard-commerce.component';
import { DashboardFinanceComponent } from './dashboard-finance/dashboard-finance.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './http-interceptor/jwt.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { CommerceGuard } from './guards/commerce.guard';
import { DirectionGuard } from './guards/direction.guard';
import { FinanceGuard } from './guards/finance.guard';
import { LogisticGuard } from './guards/logistic.guard';
import { ConnectedGuard } from './guards/connected.guard';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    FooterComponent,
    DashboardLogistiqueComponent,
    DashboardDirectionComponent,
    DashboardCommerceComponent,
    DashboardFinanceComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConnectedGuard, AdminGuard, CommerceGuard, DirectionGuard, FinanceGuard, LogisticGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
