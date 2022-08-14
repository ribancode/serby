import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './layouts/user/user.component';

const routes: Routes = [
    { path : '', component: UserComponent, loadChildren: () => import(`./user/user.module`).then(m => m.UserModule) },
    // { path: 'CE', component: CEComponent, loadChildren: () => import(`./CE/ce.module`).then(m => m.CeModule) },
    { path: 'CE', loadChildren: () => import(`./CE/auth/auth.module`).then(m => m.AuthModule) },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
