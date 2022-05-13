import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { AdministrarComponent } from './componentes/administrar/administrar.component';
import { SidebarpanelComponent } from './componentes/sidebarpanel/sidebarpanel.component';
import { HistorialComponent } from './componentes/historial/historial.component';
import { SidebarpanelhistorialComponent } from './componentes/sidebarpanelhistorial/sidebarpanelhistorial.component';
import { PublicidadComponent } from './componentes/publicidad/publicidad.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxFileDropModule } from 'ngx-file-drop';
import { StepusuarioComponent } from './componentes/stepusuario/stepusuario.component';
import { BuscarciberPipe } from './servicios/buscarciber.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarpreciosComponent } from './componentes/administrar/editarprecios/editarprecios.component';
import { AgGridModule } from 'ag-grid-angular';
import { BuscadorPipe } from './servicios/buscador.pipe';
import { CorteComponent } from './componentes/corte/corte.component';
import { BuscarhistorialPipe } from './servicios/database/pipeHistorial/buscarhistorial.pipe';
import { RegistrosComponent } from './componentes/registros/registros.component';
import { DocumentosmanualComponent } from './componentes/documentosmanual/documentosmanual.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    SidebarComponent,
    AdministrarComponent,
    SidebarpanelComponent,
    HistorialComponent,
    SidebarpanelhistorialComponent,
    PublicidadComponent,
    PagosComponent,
    StepusuarioComponent,
    BuscarciberPipe,
    EditarpreciosComponent,
    BuscadorPipe,
    CorteComponent,
    BuscarhistorialPipe,
    RegistrosComponent,
    DocumentosmanualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PdfViewerModule,
    NgxFileDropModule,
    FontAwesomeModule,
    NgxPaginationModule,
    AgGridModule.withComponents([])

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
