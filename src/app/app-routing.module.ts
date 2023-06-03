import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { adminGuard } from './core/guards/admin/admin.guard';
import { logoutGuard } from './core/guards/logout/logout.guard';

const routes: Routes = [
  {
    path: 'store',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/store/store.module').then((m) => m.StoreModule),
  },
  {
    path: 'auth',
    canActivate: [logoutGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: 'store' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
