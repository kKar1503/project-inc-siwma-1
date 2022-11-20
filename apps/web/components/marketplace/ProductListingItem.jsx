// Import prop types
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Rating from './rating/Rating';

const ProductListingItem = ({ img, name, rating, href }) => (
  <div className="card shadow-md">
    <Link href={href}>
      <div className="aspect-square object-cover h-[150px]">
        {/* ! The reason why the image below is 150px in height is because smaller images will be zoomed in to fit the height (this is so images > 150px will zoom and crop) */}
        <Image fill src={img} alt={name} className="object-cover" />
      </div>

      {/* Listing content */}
      <div className="p-2 pb-4">
        <p className="font-bold">{name}</p>
        <Rating rating={rating} />
      </div>
    </Link>
  </div>
);

ProductListingItem.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  href: PropTypes.string,
};

export default ProductListingItem;
