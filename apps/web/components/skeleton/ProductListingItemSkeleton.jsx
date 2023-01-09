// Import prop types
import PropTypes from 'prop-types';

const ProductListingItemSkeleton = ({ className = '' }) => (
  <div
    className={`card rounded-xl shadow-md border ${className} transition-all ease-out animate-pulse`}
  >
    <div className="z-30 absolute right-0 p-2" />

    <div className="aspect-square w-full h-fit relative">
      {/* ! The reason why the image below is 150px in height is because smaller images will be zoomed in to fit the height (this is so images > 150px will zoom and crop) */}

      <div className="bg-gray-300 w-full h-full rounded-xl p-1" />
    </div>

    {/* Listing content */}
    <div className="px-2 pt-2 pb-8">
      <div className="content my-1 space-y-2">
        {/* Product name */}
        <div className="h-4 bg-gray-300 rounded" />

        {/* Price */}
        <div className="h-4 bg-gray-300 rounded" />
      </div>

      {/* Rating */}
      {/* <div className="absolute bottom-1 my-2 bg-gray-300 rounded h-3" /> */}
    </div>
  </div>
);

ProductListingItemSkeleton.propTypes = {
  className: PropTypes.string,
};

export default ProductListingItemSkeleton;
