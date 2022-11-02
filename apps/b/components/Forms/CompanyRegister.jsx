const CompanyRegister = () => (
  <div>
    <input type="checkbox" id="company-register" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box rounded-xl max-w-4xl">
        <label htmlFor="company-register" className="text-lg absolute right-4 top-2">
          ✕
        </label>
        <div>
          <h3 className="text-lg font-bold">Create an individual company</h3>
          <p className="text-sm">Register an company profile to the system</p>
        </div>
        <div className="flex flex-wrap">
          <div className="flex-1 mr-10">
            <form>
              <div className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">Company name</span>
                </div>
                <input
                  type="text"
                  className="input-group input input-bordered"
                  placeholder="Company name"
                />
              </div>
              <div className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">Company website</span>
                </div>
                <input
                  type="text"
                  className="input-group input input-bordered"
                  placeholder="Company website"
                />
              </div>
              <div className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">Company bio(optional)</span>
                </div>
                <textarea className="textarea textarea-bordered h-32" placeholder="Company bio" />
              </div>
            </form>
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="label">
              <span className="label-text font-semibold">Company Logo(optional)</span>
            </div>
            <label className="flex flex-1 justify-center w-full px-8 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-gray-600"
                  fill="full"
                  viewBox="0 0 490 490"
                  stroke="currentColor"
                  strokeWidth="10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M245,0c-9.5,0-17.2,7.7-17.2,17.2v331.2L169,289.6c-6.7-6.7-17.6-6.7-24.3,0s-6.7,17.6,0,24.3l88.1,88.1
				c3.3,3.3,7.7,5,12.1,5c4.4,0,8.8-1.7,12.1-5l88.1-88.1c6.7-6.7,6.7-17.6,0-24.3c-6.7-6.7-17.6-6.7-24.3,0L262,348.4V17.1
				C262.1,7.6,254.5,0,245,0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M462.1,472.9v-99.7c0-9.5-7.7-17.2-17.2-17.2s-17.2,7.7-17.2,17.2v82.6H62.2v-82.6c0-9.5-7.7-17.2-17.1-17.2
				s-17.2,7.7-17.2,17.2v99.7c0,9.5,7.7,17.1,17.2,17.1h399.8C454.4,490,462.1,482.4,462.1,472.9z"
                  />
                </svg>
                <span className="font-medium text-sm text-gray-600">
                  Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
            <div className="modal-action">
              <label htmlFor="company-register" className="btn btn-outline btn-primary w-full">
                Register Comapny
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyRegister;
