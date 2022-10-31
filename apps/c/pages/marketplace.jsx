import Carousel from '../components/marketplace/Carousel';
import CategoryListingItem from '../components/marketplace/CategoryListingItem';
import ProductListingItem from '../components/marketplace/ProductListingItem';

const categories = [
  {
    id: 1,
    name: 'Category 1',
    img: 'https://via.placeholder.com/150',
    href: '#',
  },
  {
    id: 2,
    name: 'Category 2',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 3,
    name: 'Category 3',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 4,
    name: 'Category 2',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 5,
    name: 'Category 5',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 6,
    name: 'Category 6',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 7,
    name: 'Category 7',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 8,
    name: 'Category 8',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 9,
    name: 'Category 9',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 10,
    name: 'Category 10',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },

  {
    id: 11,
    name: 'Category 11',

    img: 'https://via.placeholder.com/150',
    href: '#',
  },
];

const products = [
  {
    id: 1,
    name: 'Product 1',
    rating: 3,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 3,
    name: 'Product 3',
    rating: 3.3,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 4,
    name: 'Product 2',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 5,
    name: 'Product 5',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 6,
    name: 'Product 6',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 7,
    name: 'Product 7',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 8,
    name: 'Product 8',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 9,
    name: 'Product 9',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 10,
    name: 'Product 10',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },

  {
    id: 11,
    name: 'Product 11',
    rating: 3.6,
    href: '#',
    img: 'https://via.placeholder.com/150',
  },
];

const MarketplacePage = () => (
  <div className="container">
    {/* Carousel */}
    <h1 className="text-3xl font-bold">Marketplace</h1>

    {/* Title */}
    <h3 className="text-xl font-bold my-2">Categories</h3>
    {/* View all categories link */}
    {/* Carousel of categories */}

    <Carousel
      items={categories.map((category) => (
        <CategoryListingItem
          key={category.id}
          img={category.img}
          name={category.name}
          href={category.href}
        />
      ))}
      name="categories"
    />

    {/* Title */}
    <h3 className="text-xl font-bold my-2">Popular</h3>

    {/* Carousel of products */}
    <Carousel
      items={products.map((product) => (
        <ProductListingItem
          img={product.img}
          name={product.name}
          rating={product.rating}
          href={product.href}
        />
      ))}
      name="popular-products"
    />

    {/* Title */}
    <h3 className="text-xl font-bold my-2">Recommended</h3>

    {/* Carousel of products */}
    <Carousel
      items={products.map((product) => (
        <ProductListingItem
          img={product.img}
          name={product.name}
          rating={product.rating}
          href={product.href}
        />
      ))}
      name="recommended-products"
    />
  </div>
);

export default MarketplacePage;
