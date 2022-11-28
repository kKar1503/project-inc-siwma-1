// Import prop types
import { useQuery } from 'react-query';
import { Enum } from '@inc/database';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { HiDotsVertical } from 'react-icons/hi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import BuyBadge from '../marketplace/listing/BuyBadge';
import SellBadge from '../marketplace/listing/SellBadge';

const ProductListingItem = ({ img, type, name, href, id, setInfiniteScrollMockData }) => {
  const supabase = useSupabaseClient();

  const DeleteListing = async (listid) => {
    await supabase.from('listing').delete().eq('id', listid);
    const { data: listingAPIData } = await supabase.rpc('get_listings', {
      item_offset: 0,
      item_limit: 100,
    });
    setInfiniteScrollMockData(listingAPIData);
  };

  const ArchiveListing = async (listid) => {
    await supabase.rpc('update_listing', { listingid: listid });
    const { data: listingAPIData } = await supabase.rpc('get_listings', {
      item_offset: 0,
      item_limit: 100,
    });
    setInfiniteScrollMockData(listingAPIData);
  };

  return (
    <div className="card shadow-md">
      <div className="flex w-full justify-end dropdown">
        <HiDotsVertical tabIndex={0} size={23} />
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          {/* change to a tags accordingly if user needs to be redirected */}
          <li>
            <button>Edit Listing</button>
          </li>
          <li>
            <button>Duplicate Listing</button>
          </li>
          <li>
            <button onClick={() => ArchiveListing(id)}>Archive</button>
          </li>
          <li>
            <button onClick={() => DeleteListing(id)} className="text-red-500">
              Delete
            </button>
          </li>
        </ul>
      </div>
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
  setInfiniteScrollMockData: PropTypes.func,
};

export default ProductListingItem;
