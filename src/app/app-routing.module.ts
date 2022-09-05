import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoComponent } from './grafico/grafico.component';
import { PerdaComponent } from './perda/perda.component';
import { PerdasComponent } from './perdas/perdas.component';

const routes: Routes = [
  {path: '', redirectTo: 'perdas', pathMatch: 'full'},
  {path: 'perdas', component: PerdasComponent},
  {path: 'grafico', component: GraficoComponent},
  {path: 'perda/:id', component: PerdaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
