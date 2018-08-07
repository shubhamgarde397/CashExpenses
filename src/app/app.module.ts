import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { WalletDispComponent } from './pages/wallet-disp/wallet-disp.component';
import { WalletAddComponent } from './pages/wallet-add/wallet-add.component';
import { WalletRemoveComponent } from './pages/wallet-remove/wallet-remove.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    WalletDispComponent,
    WalletAddComponent,
    WalletRemoveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
