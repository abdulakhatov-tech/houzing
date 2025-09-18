import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Houzing',
  },
  {
    path: 'properties',
    loadComponent: () => import('./pages/properties/properties').then((m) => m.Properties),
    title: 'Houzing | Properties',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up').then((m) => m.SignUp),
        title: 'Houzing | Sign Up',
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in').then((m) => m.SignIn),
        title: 'Houzing | Sign In',
      },
    ],
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts').then((m) => m.Contacts),
    title: 'Houzing | Contacts',
  },
  // Redirect or 404 handling
  {
    path: '**',
    component: NotFound,
    title: 'Houzing | Not Found',
    // pathMatch: 'full',
  },
];
