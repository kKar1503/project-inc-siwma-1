import Footer from './components/footer';

const pages = [
  {
    category: 'Services',
    pages: [
      {
        name: 'Loreum ipsum',
        url: 'http://localhost:3004/',
      },
      {
        name: 'Loreum ipsum',
        url: 'http://localhost:3004/',
      },
      {
        name: 'Loreum ipsum',
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
        name: 'Loreum ipsum',
        url: 'http://localhost:3004/',
      },
      {
        name: 'Loreum ipsum',
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
