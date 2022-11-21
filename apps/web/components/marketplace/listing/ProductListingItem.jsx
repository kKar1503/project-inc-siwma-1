// Import prop types
import { Enum } from '@inc/database';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Rating from '../rating/Rating';
import BuyBadge from './BuyBadge';
import SellBadge from './SellBadge';

const ProductListingItem = ({ img, type, name, rating, href }) => (
  <div className="card shadow-md">
    <Link href={href}>
      <div className="aspect-square object-cover h-[150px]">
        {/* ! The reason why the image below is 150px in height is because smaller images will be zoomed in to fit the height (this is so images > 150px will zoom and crop) */}
        {img && <Image fill src={img} alt={name} className="object-cover" />}
      </div>

      {/* Listing content */}
      <div className="p-2 pb-4">
        {type === Enum.LISTING_TYPE.BUY && <BuyBadge />}

        {type === Enum.LISTING_TYPE.SELL && <SellBadge />}
        <p className="font-bold">{name}</p>
        <Rating rating={rating} />
      </div>
    </Link>
  </div>
);

ProductListingItem.propTypes = {
  img: PropTypes.string,
  type: PropTypes.number,
  name: PropTypes.string,
  rating: PropTypes.number,
  href: PropTypes.string,
};

export default ProductListingItem;
