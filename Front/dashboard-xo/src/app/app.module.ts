import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    FooterComponent,
    DashboardLogistiqueComponent,
    DashboardDirectionComponent,
    DashboardCommerceComponent,
    DashboardFinanceComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
