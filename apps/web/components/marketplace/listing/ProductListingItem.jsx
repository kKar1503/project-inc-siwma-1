// Import prop types
import { Enum } from '@inc/database';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Rating from '../rating/Rating';
import BuyBadge from './BuyBadge';
import SellBadge from './SellBadge';

const ProductListingItem = ({
  img,
  type,
  name,
  rating,
  href,
  price,
  negotiable,
  unit_price: isUnitPrice,
  className = '',
}) => {
  const [imgSrc, setImgSrc] = useState(img);

  return (
    <div className={`card rounded-xl shadow-md border ${className} transition-all ease-out`}>
      <div className="z-30 absolute right-0 p-2" />

      <Link href={href}>
        <div className="aspect-square w-full h-fit relative ">
          {/* ! The reason why the image below is 150px in height is because smaller images will be zoomed in to fit the height (this is so images > 150px will zoom and crop) */}

          {img ? (
            <Image
              src={imgSrc}
              fill
              alt={name}
              className="object-cover absolute rounded-xl p-1"
              onError={() => setImgSrc('https://via.placeholder.com/150')}
            />
          ) : (
            <Image
              src="https://via.placeholder.com/150"
              fill
              alt={name}
              className="object-cover absolute rounded-xl p-1"
            />
          )}
        </div>

        {/* Listing content */}
        <div className="px-2 pt-2 pb-8">
          {type === Enum.LISTING_TYPE.BUY && <BuyBadge />}
          {type === Enum.LISTING_TYPE.SELL && <SellBadge />}

          <div className="content my-1">
            <p className="">{name.length > 45 ? `${name.substring(0, 45)}...` : name}</p>

            <p className="my-2 font-bold">
              S${price}
              {isUnitPrice && <span className="text-sm font-normal">/unit</span>}
            </p>

            {negotiable && <p className="text-sm">Negotiable</p>}
          </div>

          <div className="absolute bottom-1 my-2">
            <Rating rating={rating} />
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductListingItem.propTypes = {
  img: PropTypes.string,
  type: PropTypes.number,
  name: PropTypes.string,
  rating: PropTypes.number,
  href: PropTypes.string,
  className: PropTypes.string,
  price: PropTypes.number,
  negotiable: PropTypes.bool,
  unit_price: PropTypes.bool,
};

export default ProductListingItem;
