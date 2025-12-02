import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'debug',
    loadComponent: () => import('./pages/debug/debug.page').then( m => m.DebugPage)
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage)
  },
  {
    path: 'registrar-patrimonio',
    loadComponent: () => import('./pages/registrar-patrimonio/registrar-patrimonio.page').then( m => m.RegistrarPatrimonioPage)
  },
  {
    path: 'consultar-patrimonio',
    loadComponent: () => import('./pages/consultar-patrimonio/consultar-patrimonio.page').then( m => m.ConsultarPatrimonioPage)
  },
  {
    path: 'qr-scanner',
    loadComponent: () => import('./pages/qr-scanner/qr-scanner.page').then( m => m.QrScannerPage)
  },
  {
  path: 'detalle-patrimonio/:id',
  loadComponent: () =>
    import('./pages/detalle-patrimonio/detalle-patrimonio.page')
      .then(m => m.DetallePatrimonioPage)
}


];
