import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importar os componentes
import { HomeComponent } from './components/home/home.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { HistoricoComponent } from './components/historico/historico.component';
// Definir as rotas
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'calculadora', component: CalculadoraComponent },
  { path: 'resultado/:media', component: ResultadoComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }