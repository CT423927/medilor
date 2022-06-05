import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { InicioComponent } from './inicio/inicio.component';
import { AvisosComponent } from './avisos/avisos.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'avisos', component: AvisosComponent},
  {path: 'paciente/:id', component: PacienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

