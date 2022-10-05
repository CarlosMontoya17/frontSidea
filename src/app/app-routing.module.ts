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
import { CorteComponent } from './componentes/corte/corte.component';
import { DocumentosmanualComponent } from './componentes/documentosmanual/documentosmanual.component';
import { PapeleraComponent } from './componentes/papelera/papelera.component';
import { PreferencesComponent } from './componentes/inicio/new/preferences/preferences.component';
import { RfcComponent } from './componentes/rfc/rfc.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ActasComponent } from './components/actas/actas.component';
import { RegistroComponent } from './componente/registro/registro.component';
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
  path: 'app',
  component: NavbarComponent
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
{
  path: 'corte',
  component: CorteComponent
},
{
  path: 'manual',
  component: DocumentosmanualComponent
},
{
  
  path: 'papelera',
  component: PapeleraComponent
},

{
  path: 'preferences',
  component: PreferencesComponent
}
,

{
  path: 'rfc',
  component: RfcComponent
},

{
  path: 'sb',
  component: InicioComponent 
},
{
  path: 'vc' ,
  component: ActasComponent
},
{
  path: 're' ,
  component: RegistroComponent
}






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
