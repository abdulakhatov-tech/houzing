import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Home',
  },
  {
    path: 'properties',
    loadComponent: () => import('./pages/properties/properties').then((m) => m.Properties),
    title: 'Properties',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up').then((m) => m.SignUp),
        title: 'Sign Up',
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in').then((m) => m.SignIn),
        title: 'Sign In',
      },
    ],
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts').then((m) => m.Contacts),
    title: 'Contacts',
  },
  // Redirect or 404 handling
  {
    path: '**',
    component: NotFound,
    // pathMatch: 'full',
  },
];
