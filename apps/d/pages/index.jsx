import Footer from './components/footer';

const pages = [
  {
    category: 'Services',
    pages: [
      {
        name: 'Inauguration Ceremony',
        url: 'http://localhost:3004/',
      },
      {
        name: 'Committee Meetings',
        url: 'http://localhost:3004/',
      },
      {
        name: 'Members Welfare',
        url: 'http://localhost:3004/',
      },
    ],
  },
  {
    category: 'About',
    pages: [
      {
        name: 'Our Story',
        url: 'http://localhost:3004/',
      },
      {
        name: 'Trips',
        url: 'http://localhost:3004/',
      },
      {
        name: 'Visits',
        url: 'http://localhost:3004/',
      },
    ],
  },
  {
    category: 'Help & Support',
    pages: [
      {
        name: 'Contact Us',
        url: 'http://localhost:3004/',
      },
      {
        name: 'FAQs',
        url: 'http://localhost:3004/',
      },
    ],
  },
];

const FooterPage = () => <Footer arrayOfPages={pages} />;

export default FooterPage;
