import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DashboardDirectionComponent } from './components/dashboard-direction/dashboard-direction.component';
import { DashboardFinanceComponent } from './components/dashboard-finance/dashboard-finance.component';
import { DashboardCommerceComponent } from './components/dashboard-commerce/dashboard-commerce.component';
import { DashboardLogistiqueComponent } from './components/dashboard-logistique/dashboard-logistique.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { DirectionGuard } from './guards/direction.guard';
import { FinanceGuard } from './guards/finance.guard';
import { CommerceGuard } from './guards/commerce.guard';
import { LogisticGuard } from './guards/logistic.guard';
import { ConnectedGuard } from './guards/connected.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent, canActivate: [ConnectedGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
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
