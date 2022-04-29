import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./componentes/login/login.component";
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AdministrarComponent } from './componentes/administrar/administrar.component';
import { PublicidadComponent } from './componentes/publicidad/publicidad.component';
import { HistorialComponent} from './componentes/historial/historial.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { SidebarpanelhistorialComponent } from './componentes/sidebarpanelhistorial/sidebarpanelhistorial.component';
import { StepusuarioComponent } from './componentes/stepusuario/stepusuario.component';
import { EditarpreciosComponent } from './componentes/administrar/editarprecios/editarprecios.component';
const routes: Routes = [
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'inicio',
  component: InicioComponent
},
{
  path: 'administrar',
  component: AdministrarComponent
},
{
  path: 'historial',
  component: HistorialComponent
},
{
  path: 'publicidad',
  component: PublicidadComponent
},
{
  path: 'pagos',
  component: PagosComponent
},
{
  path: 'sidebarhistorial',
  component: SidebarpanelhistorialComponent
},
{
  path: 'stepusuario',
  component: StepusuarioComponent,
  
},
{
  path: 'editprecio',
  component: EditarpreciosComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
