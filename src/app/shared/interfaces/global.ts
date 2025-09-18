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

export interface IProperty {
  _id: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  garage: number;
  area: number;
  price: number;
  image: string;
}
