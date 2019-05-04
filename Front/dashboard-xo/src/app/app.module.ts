import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './Angular-Material';
import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardLogistiqueComponent } from './components/dashboard-logistique/dashboard-logistique.component';
import { DashboardDirectionComponent } from './components/dashboard-direction/dashboard-direction.component';
import { DashboardCommerceComponent } from './components/dashboard-commerce/dashboard-commerce.component';
import { DashboardFinanceComponent } from './components/dashboard-finance/dashboard-finance.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './http-interceptor/jwt.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { CommerceGuard } from './guards/commerce.guard';
import { DirectionGuard } from './guards/direction.guard';
import { FinanceGuard } from './guards/finance.guard';
import { LogisticGuard } from './guards/logistic.guard';
import { ConnectedGuard } from './guards/connected.guard';
import { UntilNow } from './pipes/until-now.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MessagesDialogComponent } from './components/messages-dialog/messages-dialog.component';
import { ColisDialogComponent } from './components/colis-dialog/colis-dialog.component';
import { ObjectifsDialogComponent } from './components/objectifs-dialog/objectifs-dialog.component';
import { DeconnexionDialogComponent } from './components/deconnexion-dialog/deconnexion-dialog.component';

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
    LoginComponent,
    UntilNow,
    AdminComponent,
    UserDetailComponent,
    MessagesDialogComponent,
    ColisDialogComponent,
    ObjectifsDialogComponent,
    DeconnexionDialogComponent
  ],
  entryComponents: [
    MessagesDialogComponent,
    ColisDialogComponent,
    ObjectifsDialogComponent,
    DeconnexionDialogComponent
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
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    ConnectedGuard, AdminGuard, CommerceGuard, DirectionGuard, FinanceGuard, LogisticGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
