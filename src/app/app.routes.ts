import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { SignIn } from './pages/auth/sign-in/sign-in';
import { SignUp } from './pages/auth/sign-up/sign-up';
import { NotFound } from './pages/not-found/not-found';
import { VerifyOtp } from './pages/auth/verify-otp/verify-otp';
import { ForgotPassword } from './pages/auth/forgot-password/forgot-password';

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
        component: SignUp,
        title: 'Houzing | Sign Up',
      },
      {
        path: 'sign-in',
        component: SignIn,
        title: 'Houzing | Sign In',
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        title: 'Houzing | Forgot Password',
      },
      {
        path: 'verify-otp',
        component: VerifyOtp,
        title: 'Houzing | Verify OTP',
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
