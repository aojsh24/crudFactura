import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from 'src/app.routing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './factura/home.component';
import { VentasComponent } from './factura/ventas.component';
import { FacturasComponent } from './factura/facturas.component';
import { FacturaComponent } from './factura/factura.component';
import { EditarComponent } from './factura/editar.component';
import { HeaderComponent } from './factura/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FacturaComponent,
    VentasComponent,
    EditarComponent,
    HeaderComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
