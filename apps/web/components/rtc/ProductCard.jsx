const ProductCard = () => (
  <div className="card rounded-lg bg-base-100 shadow-xl h-60 md:h-80 overflow-y-auto">
    <figure>
      <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
    </figure>
    <div className="card-body p-4 md:p-6">
      <h2 className="card-title text-sm md:text-base lg:text-lg">Mild Steel Channel Hot Rolled (Bar 0.750 x 0.375 x 0.125)</h2>
      <h6 className="font-bold text-md">Description</h6>
      <p className="text-sm">If a dog chews shoes whose shoes does he choose?</p>
    </div>
  </div>
);

export default ProductCard;