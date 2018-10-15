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
import { WalletDispComponent } from './pages/Wallet/wallet-disp/wallet-disp.component';
import { WalletAddComponent } from './pages/Wallet/wallet-add/wallet-add.component';
import { WalletRemoveComponent } from './pages/Wallet/wallet-remove/wallet-remove.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { getFullApi } from './services/handleData/getFullApi.service';
import { handleFunction } from './services/Functions/handleFunctions';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WalletHandlerComponent } from './pages/Wallet/wallet-handler/wallet-handler.component';
import { DebitCardHandlerComponent } from './pages/DebitCard/debit-card-handler/debit-card-handler.component';
import { DebitCardDisplayComponent } from './pages/DebitCard/debit-card-display/debit-card-display.component';
import { DebitCardCreditComponent } from './pages/DebitCard/debit-card-credit/debit-card-credit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    WalletDispComponent,
    WalletAddComponent,
    WalletRemoveComponent,
    CategoriesComponent,
    MainPageComponent,
    WalletHandlerComponent,
    DebitCardHandlerComponent,
    DebitCardDisplayComponent,
    DebitCardCreditComponent
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
  providers: [getFullApi, handleFunction],
  bootstrap: [AppComponent]
})
export class AppModule { }
