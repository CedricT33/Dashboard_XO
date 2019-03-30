import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DashboardDirectionComponent } from './dashboard-direction/dashboard-direction.component';
import { DashboardFinanceComponent } from './dashboard-finance/dashboard-finance.component';
import { DashboardCommerceComponent } from './dashboard-commerce/dashboard-commerce.component';
import { DashboardLogistiqueComponent } from './dashboard-logistique/dashboard-logistique.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { DirectionGuard } from './guards/direction.guard';
import { FinanceGuard } from './guards/finance.guard';
import { CommerceGuard } from './guards/commerce.guard';
import { LogisticGuard } from './guards/logistic.guard';
import { ConnectedGuard } from './guards/connected.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent, canActivate: [ConnectedGuard] },
  { path: 'direction', component: DashboardDirectionComponent, canActivate: [DirectionGuard] },
  { path: 'finance', component: DashboardFinanceComponent, canActivate: [FinanceGuard] },
  { path: 'commerce', component: DashboardCommerceComponent, canActivate: [CommerceGuard] },
  { path: 'logistique', component: DashboardLogistiqueComponent, canActivate: [LogisticGuard] },
  { path: '**', component: AccueilComponent, canActivate: [ConnectedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
