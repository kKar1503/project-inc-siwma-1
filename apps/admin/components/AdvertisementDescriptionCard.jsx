const AdvertisementDescriptionCard = () => (
  <div className="max-w-xl">
    <h1 className="ml-4 leading-loose font-bold text-xl mt-6">Description of Advertisement</h1>
    <div className="flex justify-center">
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="w-11/12 h-40 px-4 mt-4 text-base placeholder-gray-500 break-normal border rounded-lg focus:shadow-outline"
      />
    </div>
  </div>
);

export default AdvertisementDescriptionCard;
