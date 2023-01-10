// Import prop types
import { Enum } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import cx from 'classnames';
import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
  ownerId,
  ownerFullName,
  createdAt,
  companyName,
  unit_price: isUnitPrice,
  className = '',
}) => {
  const [imgSrc, setImgSrc] = useState(img);

  const supabase = useSupabaseClient();

  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const getUserProfilePictureURL = async (userId) => {
    const res = await supabase.storage.from('user-image-bucket').getPublicUrl('default-user.png');

    setProfilePictureUrl(res.data.publicUrl);
  };

  useEffect(() => {
    getUserProfilePictureURL('abc');
  }, []);

  return (
    <div
      className={cx('card rounded-xl shadow-md border transition-all ease-out', {
        [className]: className,
      })}
    >
      {/* User details */}
      <div className="p-2 flex gap-2 items-center">
        <div>
          {profilePictureUrl && (
            <Image
              src={profilePictureUrl}
              width={30}
              height={30}
              className="rounded-full"
              alt={`${ownerFullName}'s Profile Picture`}
            />
          )}
        </div>

        <div className="flex-1">
          <Link href="/">
            <p className="text-sm hover:underline font-semibold">{ownerFullName}</p>
          </Link>

          <Link href="/">
            <p className="text-xs hover:underline text-gray-500">{companyName}</p>
          </Link>
        </div>
      </div>

      <Link data-cy={`product-${href}`} href={href}>
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
            {/* The styles below are adapted from the @tailwindcss/line-clamp documentation (https://github.com/tailwindlabs/tailwindcss-line-clamp) */}
            <p
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {name}
            </p>

            <p className="my-2 font-bold">
              {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(price)}
              {isUnitPrice && <span className="text-sm font-normal">/unit</span>}
            </p>

            {negotiable && <p className="text-sm">Negotiable</p>}
          </div>

          <p className="text-xs text-gray-500 my-2">
            {DateTime.fromISO(createdAt).toRelative({ locale: 'en-SG' })}
          </p>

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
  ownerId: PropTypes.string,
  ownerFullName: PropTypes.string,
  companyName: PropTypes.string,
  createdAt: PropTypes.string,
};

export default ProductListingItem;
