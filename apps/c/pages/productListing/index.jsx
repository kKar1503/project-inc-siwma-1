import ReviewBox from '../../components/ReviewBox';

const productListing = () => (
  <div className="h-screen m-5">
    <div className="w-screen h-1/5">
      <h1 className="text-3xl font-bold underline border-2">Image Carousell</h1>
    </div>
    <div className="flex-row flex">
      <div className="w-2/3">
        <p className="text-2xl mt-5 text-gray-500">Product Name</p>
        <p className="text-2xl mt-5 text-gray-500">Description</p>
        <p className="text-2xl mt-5 text-gray-500">Timestamp</p>
        {/* Hardcoded Reviews */}
        <div className="flex flex-row mt-5">
          <p className="text-2xl text-gray-500 w-32">Reviews</p>
          <div className="rating rating-md h-full">
            <p className="text-2xl text-gray-500 w-10"> 5.0 </p>
            <div className="pt-1">
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            </div>
            {/* can't space the (6) with w-10 for some reason */}
            <p className="text-2xl text-gray-500">&nbsp;(6) </p>
          </div>
        </div>
        <ReviewBox
          name="John Doe"
          description="lorem ipsum sussy baka no cyap it got dat unspoken rizz"
          pfp="https://thispersondoesnotexist.com/image"
        />
        <ReviewBox
          name="Jane Mary"
          description="this product is bussin"
          pfp="https://placeimg.com/192/192/people"
        />
      </div>
      <div className="w-1/3 border-2 border-red-900">seller profile component</div>
    </div>
    {/* <div className="w-1/2 bg-gray-300 border-2 m-5">
      
    </div> */}
  </div>
);

export default productListing;
