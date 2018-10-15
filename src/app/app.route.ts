import { Routes } from "@angular/router";
import { NavigationComponent } from "./pages/navigation/navigation.component";
import { WalletDispComponent } from "./pages/Wallet/wallet-disp/wallet-disp.component";
import { WalletAddComponent } from "./pages/Wallet/wallet-add/wallet-add.component";
import { WalletRemoveComponent } from "./pages/Wallet/wallet-remove/wallet-remove.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { WalletHandlerComponent } from "./pages/Wallet/wallet-handler/wallet-handler.component";
import { DebitCardHandlerComponent } from "./pages/DebitCard/debit-card-handler/debit-card-handler.component";
import { DebitCardDisplayComponent } from "./pages/DebitCard/debit-card-display/debit-card-display.component";
import { DebitCardCreditComponent } from "./pages/DebitCard/debit-card-credit/debit-card-credit.component";

export const routes: Routes = [
    {
        path: 'Navigation',
        component: NavigationComponent,
        children:
            [
                {
                    path: '',
                    component: MainPageComponent
                },
                {
                    path: 'Wallet',
                    component: WalletHandlerComponent,
                    children:
                        [
                            {
                                path: '',
                                component: WalletDispComponent
                            },
                            {
                                path: 'WalletDisplay',
                                component: WalletDispComponent
                            },
                            {
                                path: 'AddExpenses',
                                component: WalletAddComponent
                            },
                            {
                                path: 'RemoveExpenses',
                                component: WalletRemoveComponent
                            },
                            {
                                path: 'AddCategory',
                                component: CategoriesComponent
                            }
                        ]
                },
                {
                    path: 'Card',
                    component: DebitCardHandlerComponent,
                    children:
                        [
                            {
                                path: '',
                                component: DebitCardDisplayComponent
                            },
                            {
                                path: 'DebitCard',
                                component: DebitCardDisplayComponent
                            },
                            {
                                path: 'CreditCard',
                                component: DebitCardCreditComponent
                            }
                        ]
                }



            ]
    }


];