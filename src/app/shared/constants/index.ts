import { IMenuItem, ISocialMediaItem } from '@shared/interfaces/global';

export const menuItems: IMenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'Contacts', path: '/contacts' },
];

export const socialMediaItems: ISocialMediaItem[] = [
  { label: 'Facebook', path: 'https://www.facebook.com', icon: 'assets/icons/facebook.svg' },
  { label: 'Twitter', path: 'https://www.twitter.com', icon: 'assets/icons/twitter.svg' },
  { label: 'Instagram', path: 'https://www.instagram.com', icon: 'assets/icons/instagram.svg' },
  { label: 'Linkedin', path: 'https://www.linkedin.com', icon: 'assets/icons/linkedin.svg' },
];
