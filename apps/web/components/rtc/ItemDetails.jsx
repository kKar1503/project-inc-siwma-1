import UserProfileCard from './UserProfileCard';
import ProductCard from './ProductCard';

const ItemDetails = () => (
  <div>
    <div className="flex justify-between items-center">
      <div>
        <p className="uppercase text-xs font-bold text-blue-500">order 29380</p>
        <h6 className="uppercase text-2xl font-bold">
          $5940.<span className="text-gray-200">95</span>
        </h6>
      </div>
      <div className="bg-blue-500 rounded-lg py-2 px-2">
        <p className="text-white text-lg font-bold">In Progress</p>
      </div>
    </div>
    <h6 className="mt-6 font-bold text-xl">Details</h6>
    <div className="tabs tabs-boxed flex justify-evenly mt-2">
      <a className="tab tab-active" href="localhost:1111">
        Seller
      </a>
      <a className="tab" href="localhost:1111">
        Item
      </a>
    </div>
    <div className="mt-4">
      <UserProfileCard />
      {/* <ProductCard /> */}
    </div>
    <div className="flex justify-between items-center gap-1 mt-4 absolute bottom-4 w-11/12">
      <a href="#offer-modal">
        <button className="btn btn-info bg-opacity-30">MAKE OFFER</button>
      </a>
      <button className="btn btn-error bg-opacity-30">REPORT USER</button>
    </div>
  </div>
);

export default ItemDetails;
