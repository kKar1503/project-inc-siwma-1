import Link from 'next/link';
import Container from '../components/Container';
import Carousel from '../components/marketplace/carousel/Carousel';
import CarouselItemWrapper from '../components/marketplace/carousel/CarouselItemWrapper';
import CategoryListingItem from '../components/marketplace/CategoryListingItem';
import ProductListingItem from '../components/marketplace/ProductListingItem';

const categories = [
  {
    id: 1,
    name: 'Mobile Phones',
    img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
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
    img: 'https://via.placeholder.com/150x50',
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
  <div>
    {/* TODO: Ask for proper dimensions for the banner image at the top */}
    {/* Image banner */}
    <div className="mb-10">
      {/* Image banner - Object cover covers the image (zoom crop) */}
      <picture>
        <img
          src="https://via.placeholder.com/1500x500"
          className="object-cover w-full h-[200px]"
          alt="Banner"
        />
      </picture>
    </div>

    {/* Container just adds margin from left and right */}
    <Container>
      {/* Carousel */}
      <h1 className="text-3xl font-bold">Marketplace</h1>

      <div className="flex flex-wrap justify-between items-center">
        {/* Title */}
        <h3 className="text-xl font-bold my-2">Categories</h3>
        {/* View all categories link */}
        <Link href="/categories">
          <p className="link">View all categories</p>
        </Link>
      </div>

      {/* Carousel of categories */}
      <Carousel name="categories">
        {categories.map((category) => (
          <CarouselItemWrapper key={category.id}>
            <CategoryListingItem name={category.name} img={category.img} href={category.href} />
          </CarouselItemWrapper>
        ))}
      </Carousel>

      {/* Title */}
      <h3 className="text-xl font-bold my-2">Popular</h3>

      {/* Carousel of products */}
      <Carousel name="popular-products">
        {products.map((product) => (
          <CarouselItemWrapper key={product.id}>
            <ProductListingItem
              img={product.img}
              name={product.name}
              rating={product.rating}
              href={product.href}
            />
          </CarouselItemWrapper>
        ))}
      </Carousel>

      {/* Title */}
      <h3 className="text-xl font-bold my-2">Recommended</h3>

      {/* Carousel of products */}
      <Carousel name="recommended-products">
        {products.map((product) => (
          <CarouselItemWrapper key={product.id}>
            <ProductListingItem
              img={product.img}
              name={product.name}
              rating={product.rating}
              href={product.href}
            />
          </CarouselItemWrapper>
        ))}
      </Carousel>
    </Container>
  </div>
);

export default MarketplacePage;
