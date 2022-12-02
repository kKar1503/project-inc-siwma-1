import Link from 'next/link';
import useCategoriesData from '../../../hooks/useCategoriesData';
import Carousel from '../carousel/Carousel';
import CategoryListingItem from '../CategoryListingItem';

const MarketplaceCategorySection = () => {
  const { categoriesData, categoriesAPILoading, categoriesAPIError, categoriesAPIStatus } =
    useCategoriesData();

  return (
    <>
      <div className="flex flex-wrap justify-between items-center">
        {/* Title */}
        <h3 className="text-xl font-bold my-2">Categories</h3>
        {/* View all categories link */}
        <Link href="/category">
          <p className="link">View all categories</p>
        </Link>
      </div>

      <Carousel name="categories" carouselWrapperClassName="mb-10">
        {categoriesData &&
          categoriesData.map(({ id, name, imageUrl }) => (
            <CategoryListingItem
              key={id}
              name={name}
              img={imageUrl}
              href={`/category/${name}?id=${id}`}
            />
          ))}
      </Carousel>
    </>
  );
};

export default MarketplaceCategorySection;
