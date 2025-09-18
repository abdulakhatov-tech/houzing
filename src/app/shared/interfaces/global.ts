export interface IMenuItem {
  label: string;
  path: string;
}

export interface ISocialMediaItem {
  label: string;
  path: string;
  icon: string;
}

export interface IFooterLink {
  text: string;
  link: string;
  icon?: string;
}

export interface IFooterSection {
  title: string;
  items: IFooterLink[];
  socialMediaItems?: ISocialMediaItem[];
}
