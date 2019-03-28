import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DashboardDirectionComponent } from './dashboard-direction/dashboard-direction.component';
import { DashboardFinanceComponent } from './dashboard-finance/dashboard-finance.component';
import { DashboardCommerceComponent } from './dashboard-commerce/dashboard-commerce.component';
import { DashboardLogistiqueComponent } from './dashboard-logistique/dashboard-logistique.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'direction', component: DashboardDirectionComponent },
  { path: 'finance', component: DashboardFinanceComponent },
  { path: 'commerce', component: DashboardCommerceComponent },
  { path: 'logistique', component: DashboardLogistiqueComponent },
  { path: '**', component: AccueilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
