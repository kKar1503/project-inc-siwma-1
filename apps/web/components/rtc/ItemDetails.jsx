/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import UserProfileCard from './UserProfileCard';
import ProductCard from './ProductCard';

const ItemDetails = () => {
  const [detailsType, setDetailsType] = useState('Seller');

  return (
    <div className="">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
        <div>
          <p className="uppercase text-xs font-bold text-blue-500">item name</p>
          <h6 className="uppercase font-bold text-lg md:text-xl lg:text-2xl">
            $5940.<span className="text-gray-200">95</span>
          </h6>
        </div>
        <div className="bg-blue-500 rounded-lg py-2 px-2">
          <p className="text-white font-bold text-sm md:text-base lg:text-lg whitespace-nowrap">
            In Progress
          </p>
        </div>
      </div>
      <h6 className="mt-6 font-bold text-xl">Details</h6>
      <div className="tabs tabs-boxed flex justify-evenly mt-2">
        <a
          className={`tab ${detailsType === 'Seller' ? 'tab-active' : ''}`}
          onClick={() => setDetailsType('Seller')}
        >
          Seller
        </a>
        <a
          className={`tab ${detailsType === 'Item' ? 'tab-active' : ''}`}
          onClick={() => setDetailsType('Item')}
        >
          Item
        </a>
      </div>
      <div className="mt-4">{detailsType === 'Seller' ? <UserProfileCard /> : <ProductCard />}</div>
      <a href="#offer-modal" className="pb-2 md:pb-0">
        <button className="btn bg-blue-700 border-none text-white text-xs md:text-sm w-full my-6">MAKE OFFER</button>
      </a>
    </div>
  );
};

export default ItemDetails;
