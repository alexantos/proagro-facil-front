import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerdaComponent } from './perda/perda.component';
import { PerdasComponent } from './perdas/perdas.component';

const routes: Routes = [
  {path: '', redirectTo: 'perdas', pathMatch: 'full'},
  {path: 'perdas', component: PerdasComponent},
  {path: 'perda', component: PerdaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
