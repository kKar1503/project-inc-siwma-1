// Import prop types
import { Enum } from '@inc/database';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { HiDotsVertical } from 'react-icons/hi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import BuyBadge from '../marketplace/listing/BuyBadge';
import SellBadge from '../marketplace/listing/SellBadge';
import ArchiveBadge from '../marketplace/listing/ArchiveBadge';
import SoldBadge from '../marketplace/listing/SoldBadge';
import BoughtBadge from '../marketplace/listing/BoughtBadge';

const ProductListingItem = ({
  img,
  type,
  name,
  href,
  id,
  visibility,
  open,
  price,
  unit_price: isUnitPrice,
  negotiable,
  setInfiniteScrollMockData,
}) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  // still null on ProfileListing.jsx
  const [imgSrc, setImgSrc] = useState(img);

  const EditListing = (listid) => {
    // eslint-disable-next-line no-alert
    alert(`WIP: listid: ${listid}`);
  };

  const CopyListing = (listid) => {
    router.push(`/new-listing?copy=1&listing=${listid}`);
  };

  const DeleteListing = async (listid) => {
    await supabase.from('listing').delete().eq('id', listid);
    const { data: listingAPIData } = await supabase.rpc('get_listings_ordered', {
      item_offset: 0,
      item_limit: 100,
    });
    setInfiniteScrollMockData(listingAPIData);
  };

  const ArchiveListing = async (listid) => {
    await supabase.rpc('archive_listing', { listingid: listid });
    const { data: listingAPIData } = await supabase.rpc('get_listings_ordered', {
      item_offset: 0,
      item_limit: 100,
    });
    setInfiniteScrollMockData(listingAPIData);
  };

  const UnarchiveListing = async (listid) => {
    await supabase.rpc('unarchive_listing', { listingid: listid });
    const { data: listingAPIData } = await supabase.rpc('get_listings_ordered', {
      item_offset: 0,
      item_limit: 100,
    });
    setInfiniteScrollMockData(listingAPIData);
  };

  return (
    <div className="card shadow-md h-full">
      <div className="flex w-full justify-end dropdown z-10">
        <HiDotsVertical tabIndex={0} size={23} />
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          {/* change to a tags accordingly if user needs to be redirected */}
          <li>
            <button onClick={() => EditListing(id)}>Edit Listing</button>
          </li>
          <li>
            <button onClick={() => CopyListing(id)}>Duplicate Listing</button>
          </li>
          {visibility ? (
            <li>
              <button onClick={() => ArchiveListing(id)}>Archive</button>
            </li>
          ) : (
            <li>
              <button onClick={() => UnarchiveListing(id)}>Unarchive</button>
            </li>
          )}
          <li>
            <button onClick={() => DeleteListing(id)} className="text-red-500">
              Delete
            </button>
          </li>
        </ul>
      </div>

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
          {(type === Enum.LISTING_TYPE.BUY && <BuyBadge />) ||
            (type === Enum.LISTING_TYPE.SELL && <SellBadge />)}

          {type === Enum.LISTING_TYPE.BUY && !open && <BoughtBadge />}
          {type === Enum.LISTING_TYPE.SELL && !open && <SoldBadge />}

          {visibility === false && <ArchiveBadge />}

          <div className="content my-1">
            <p className="truncate">{name}</p>

            <p className="my-2 font-bold">
              S${price}
              {isUnitPrice && <span className="text-sm font-normal">/unit</span>}
            </p>

            {negotiable && <p className="text-sm">Negotiable</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductListingItem.propTypes = {
  img: PropTypes.string,
  type: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  href: PropTypes.string,
  visibility: PropTypes.bool,
  open: PropTypes.bool,
  price: PropTypes.number,
  unit_price: PropTypes.bool,
  negotiable: PropTypes.bool,
  setInfiniteScrollMockData: PropTypes.func,
};

export default ProductListingItem;
