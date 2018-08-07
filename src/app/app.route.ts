import { Routes } from "@angular/router";
import { NavigationComponent } from "./pages/navigation/navigation.component";
import { WalletDispComponent } from "./pages/wallet-disp/wallet-disp.component";
import { WalletAddComponent } from "./pages/wallet-add/wallet-add.component";
import { WalletRemoveComponent } from "./pages/wallet-remove/wallet-remove.component";

export const routes: Routes = [
    {
        path: 'Navigation',
        component: NavigationComponent,
        children:
            [
                {
                    path: '',
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

            ]
    }


];