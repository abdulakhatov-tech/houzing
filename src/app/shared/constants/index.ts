import {
  IMenuItem,
  IProperty,
  ITestimonial,
  IFooterSection,
  ISocialMediaItem,
  IWhyChooseUsItem,
} from '@shared/interfaces/global';

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

export const footerItems: IFooterSection[] = [
  {
    title: 'Contact Us',
    items: [
      {
        icon: 'assets/icons/location.svg',
        text: '329 Queensberry Street, North Melbourne VIC 3051, Australia.',
        link: 'https://maps.app.goo.gl/UkRvU6BRLNsMT4En7',
      },
      {
        icon: 'assets/icons/phone.svg',
        text: '+1 123 456 7890',
        link: 'tel:+11234567890',
      },
      {
        icon: 'assets/icons/email.svg',
        text: 'support@houzing.com',
        link: 'mailto:support@houzing.com',
      },
    ],
    socialMediaItems: socialMediaItems,
  },
  {
    title: 'Discover',
    items: [
      { text: 'Chicago', link: 'https://maps.app.goo.gl/pQb1YuJyh1vW7VaG7' },
      { text: 'Los Angeles', link: 'https://maps.app.goo.gl/62zUVUTZSWkpN23F9' },
      { text: 'Miami', link: 'https://maps.app.goo.gl/FDHN1dKyMuBbvtYc8' },
      { text: 'New York', link: 'https://maps.app.goo.gl/LMcjMtNzqB4dkhD98' },
      { text: 'San Francisco', link: 'https://maps.app.goo.gl/QZGUkdN8JA8siNuS9' },
    ],
  },
  {
    title: 'Lists by Category',
    items: [
      { text: 'Apartments', link: '/properties?category=apartment' },
      { text: 'Condos', link: '/properties?category=condo' },
      { text: 'Houses', link: '/properties?category=house' },
      { text: 'Offices', link: '/properties?category=office' },
      { text: 'Retail', link: '/properties?category=retail' },
      { text: 'Villas', link: '/properties?category=villa' },
    ],
  },
  {
    title: 'About Us',
    items: [
      { text: 'About Compnay', link: '/about' },
      { text: 'Properties', link: '/properties' },
      { text: 'Contact Us', link: '/contacts' },
      { text: 'Terms & Conditions', link: '/terms-conditions' },
      { text: 'Support Center', link: '/support-center' },
    ],
  },
];

export const heroSectionItems: IProperty[] = [
  {
    _id: '1',
    title: 'Skyper Pool Partment',
    address: '112 Glenwood Ave Hyde Park, Boston, MA',
    beds: 4,
    baths: 5,
    garage: 1,
    area: 1200,
    price: 2342,
    image: '/assets/images/hero-bg.png',
  },
  {
    _id: '2',
    title: 'Modern Apartment',
    address: '123 Main St, Springfield, IL',
    beds: 3,
    baths: 2,
    garage: 1,
    area: 950,
    price: 5250,
    image: '/assets/images/hero-bg-2.png',
  },
];

export const whyChooseUsItems: IWhyChooseUsItem[] = [
  {
    _id: '1',
    imgUrl: '/assets/icons/discord.svg',
    title: 'Trusted By Thousands',
    description:
      'With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.',
  },
  {
    _id: '2',
    imgUrl: '/assets/icons/house.svg',
    title: 'Wide Range Of Properties',
    description:
      'From cozy starter apartments to spacious luxury estates, we offer listings in every style, size, and budget across top neighborhoods.',
  },
  {
    _id: '3',
    imgUrl: '/assets/icons/calculator.svg',
    title: 'Financing Made Easy',
    description:
      'Our experts guide you through mortgage options and pre-approval steps so you can secure the best rates and buy with confidence.',
  },
  {
    _id: '4',
    imgUrl: '/assets/icons/maps.svg',
    title: 'See Neighborhoods',
    description:
      'Interactive maps and detailed local insights help you explore schools, amenities, and lifestyle features before you decide to move.',
  },
];

export const testimonials: ITestimonial[] = [
  {
    _id: '1',
    title:
      "I believe in lifelong learning and Skola is a great place to learn from experts. I've learned a lot and recommend it to all my friends",
    fullName: 'Marvin McKinney',
    position: 'Designer',
    imgUrl: '/assets/images/testimonial-1.png',
  },
  {
    _id: '2',
    title:
      'The courses are well-structured and the mentors are always helpful. I’ve gained practical skills that I use every day at work.',
    fullName: 'Courtney Henry',
    position: 'Frontend Developer',
    imgUrl: '/assets/images/testimonial-2.png',
  },
  {
    _id: '3',
    title:
      'Skola makes complex topics easy to understand. The interactive lessons kept me engaged and motivated to finish every module.',
    fullName: 'Jerome Bell',
    position: 'Data Analyst',
    imgUrl: '/assets/images/testimonial-3.png',
  },
  {
    _id: '4',
    title:
      'I appreciate the flexible schedule and high-quality content. It allowed me to learn at my own pace while balancing a busy job.',
    fullName: 'Esther Howard',
    position: 'Product Manager',
    imgUrl: '/assets/images/testimonial-4.png',
  },
  {
    _id: '5',
    title:
      'Thanks to Skola I transitioned into a new career. The real-world projects and community support were exactly what I needed.',
    fullName: 'Kathryn Murphy',
    position: 'UX Researcher',
    imgUrl: '/assets/images/testimonial-5.png',
  },
  {
    _id: '6',
    title:
      'Every course feels like a conversation with industry experts. I’m always excited to log in and discover something new.',
    fullName: 'Ralph Edwards',
    position: 'Software Engineer',
    imgUrl: '/assets/images/testimonial-6.png',
  },
];
