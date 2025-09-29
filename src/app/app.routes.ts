import { Routes } from '@angular/router';

// Auth Pages
import { SignIn } from './pages/auth/sign-in/sign-in';
import { SignUp } from './pages/auth/sign-up/sign-up';
import { VerifyOtp } from './pages/auth/verify-otp/verify-otp';
import { ForgotPassword } from './pages/auth/forgot-password/forgot-password';

// Pages
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Contacts } from './pages/contacts/contacts';
import { NotFound } from './pages/not-found/not-found';
import { Users } from './pages/profile/tabs/users/users';
import { ResetPassword } from './pages/auth/reset-password/reset-password';

// Utility functions
import { NoAuthGuard } from '@shared/utils/no-auth';
import { AuthGuard } from '@shared/utils/auth.guard';
import { ProfileProducts } from './pages/profile/tabs/profile-products/profile-products';
import { ProfileOrders } from './pages/profile/tabs/profile-orders/profile-orders';
import { ProfileCategories } from './pages/profile/tabs/profile-categories/profile-categories';
import { ProfileLocation } from './pages/profile/tabs/profile-location/profile-location';
import { ProfileContact } from './pages/profile/tabs/profile-contact/profile-contact';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
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
      {
        path: 'reset-password',
        component: ResetPassword,
        title: 'Houzing | Reset Password',
      },
    ],
  },
  {
    path: 'contacts',
    component: Contacts,
    title: 'Houzing | Contacts',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: Profile,
    title: 'Houzing | Profile',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: Users,
        title: 'Houzing | Users'
      },
      {
        path: 'products',
        component: ProfileProducts,
        title: 'Houzing | Products'
      },
      {
        path: 'orders',
        component: ProfileOrders,
        title: 'Houzing | Orders'
      },
      {
        path: 'categories',
        component: ProfileCategories,
        title: 'Houzing | Categories'
      },
      {
        path: 'location',
        component: ProfileLocation,
        title: 'Houzing | Location'
      },
      {
        path: 'contact',
        component: ProfileContact,
        title: 'Houzing | Contact'
      }
    ]
  },
  // Redirect or 404 handling
  {
    path: '**',
    component: NotFound,
    title: 'Houzing | Not Found',
    // pathMatch: 'full',
  },
];
