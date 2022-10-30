import CategoryListingItem from '@inc/ui/components/marketplace/CategoryListingItem';
import ProductListingItem from '@inc/ui/components/marketplace/ProductListingItem';

const categories = [
  {
    name: 'Category 1',
    img: 'https://via.placeholder.com/150',
    href: '#',
  },
  {
    name: 'Category 2',

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
];

const MarketplacePage = () => (
  <div>
    {/* Carousel */}
    <h1>Marketplace</h1>

    <h3>Categories</h3>
    {/* View all categories link */}
    {/* Carousel of categories */}

    <div className="flex gap-5">
      {categories.map((category) => (
        <CategoryListingItem img={category.img} name={category.name} href={category.href} />
      ))}
    </div>

    <h3>Popular</h3>
    {/* Carousel of products */}
    <div className="flex gap-5">
      {products.map((product) => (
        <ProductListingItem
          img={product.img}
          name={product.name}
          rating={product.rating}
          href={product.href}
        />
      ))}
    </div>

    <h3>Recommended</h3>
    {/* Carousel of products */}
    <div className="flex gap-5">
      {products.map((product) => (
        <ProductListingItem
          img={product.img}
          name={product.name}
          rating={product.rating}
          href={product.href}
        />
      ))}
    </div>
  </div>
);

export default MarketplacePage;
