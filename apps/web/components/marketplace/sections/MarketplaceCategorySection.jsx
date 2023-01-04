import Link from 'next/link';
import useCategoriesData from '../../../hooks/useCategoriesData';
import CategoryListingItemSkeleton from '../../skeleton/CategoryListingItemSkeleton';
import Carousel from '../carousel/Carousel';
import CategoryListingItem from '../CategoryListingItem';

const MarketplaceCategorySection = () => {
  const { categoriesData, categoriesAPILoading, categoriesAPIError, categoriesAPIStatus } =
    useCategoriesData();

  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-between items-center">
        {/* Title */}
        <h3 className="text-xl font-bold my-2">Categories</h3>
        {/* View all categories link */}
        <Link href="/categories">
          <p data-cy="view-all-categories" className="link">
            View all categories
          </p>
        </Link>
      </div>

      {categoriesAPIError && (
        <div className="text-red-500">There was an error loading the categories.</div>
      )}

      {categoriesAPILoading && (
        <Carousel showButtons={false} name="categories" itemsToMoveBy={3}>
          {categoriesAPILoading &&
            [...Array(10)].map((_, i) => <CategoryListingItemSkeleton key={i} />)}
        </Carousel>
      )}

      {categoriesData && categoriesData.length > 0 && (
        <Carousel name="categories" itemsToMoveBy={3}>
          {categoriesData.map(({ id, name, imageUrl }) => (
            <CategoryListingItem
              key={id}
              name={name}
              img={imageUrl}
              href={`/category/${name}?id=${id}`}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MarketplaceCategorySection;
