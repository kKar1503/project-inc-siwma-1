const CreateListingInformation = () => (
  <form className="p-5">
    {/* Selling/Buying Options */}
    <div className="flex flex-row justify-between mb-5">
      <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded w-2/5 ml-2">
        Selling
      </button>
      <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded w-2/5 mr-2">
        Buying
      </button>
    </div>

    {/* Category Label */}
    <select className="select select-bordered w-full text-center">
      <option disabled selected>
        Category
      </option>
      <option>Bar</option>
      <option>Angle Bars</option>
      <option>Big Bricks</option>
    </select>

    {/* Title Label */}
    <label htmlFor="title" className="label">
      <span className="label-text mt-31 text-xl font-bold">Title</span>
    </label>
    <input
      id="title"
      type="text"
      placeholder="Title of your listing..."
      className="input input-bordered w-full "
    />

    {/* Condition Label */}
    <label htmlFor="condition" className="label">
      <span className="label-text mt-3 text-xl font-bold">Condition</span>
    </label>
    <div id="condition" className="btn-group">
      <input
        type="radio"
        name="options"
        data-title="Brand New"
        className="btn bg-white border-blue-300 text-blue-300 hover:bg-white hover:border-blue-400"
        checked
      />
      <input
        type="radio"
        name="options"
        data-title="Lightly Used"
        className="btn bg-white border-blue-300 text-blue-300 hover:bg-white hover:border-blue-400"
      />
    </div>

    {/* Price Label */}
    <label htmlFor="price" className="label">
      <span className="label-text mt-31 text-xl font-bold">Price</span>
    </label>
    <input id="price" type="number" placeholder="S$" className="input input-bordered w-full" />

    {/* Description Label */}
    <div className="form-control">
      <label htmlFor="description" className="label">
        <span className="label-text mt-31 text-xl font-bold">Description</span>
      </label>
      <textarea
        id="description"
        className="textarea textarea-bordered h-24"
        placeholder="Describe your listing..."
      />
    </div>

    {/* List Now Submit Btn */}
    <div className="flex flex-row justify-end">
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded mt-5"
      >
        List Now
      </button>
    </div>
  </form>
);

export default CreateListingInformation;
