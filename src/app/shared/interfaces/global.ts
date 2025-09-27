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

export interface ISearchParams {
  query?: string;
  country?: string;
  region?: string;
  city?: string;
  zip?: string;
  rooms?: string;
  size?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface IWhyChooseUsItem {
  _id: string;
  imgUrl: string;
  title: string;
  description: string;
}

export interface ITestimonial {
  _id: string;
  title: string;
  fullName: string;
  position: string;
  imgUrl: string;
}
