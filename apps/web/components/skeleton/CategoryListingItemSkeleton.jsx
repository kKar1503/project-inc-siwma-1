// Import prop types

/**
 * CategoryListingItem is a component that displays a category listing item.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */

const CategoryListingItemSkeleton = () => (
  <div className="card relative rounded-md animate-pulse">
    <div className="aspect-square object-cover h-[160px]">
      {/* Image */}
      <div className="bg-gray-300 w-full h-full rounded-xl p-1" />
    </div>
  </div>
);

export default CategoryListingItemSkeleton;
