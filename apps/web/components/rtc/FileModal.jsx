const FileModal = () => (
  <div className="modal" id="file-modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-4">File Upload</h3>
      <div className="border-dashed border-2 rounded-md border-sky-500 relative flex justify-center">
        <div className="my-20">
          <h2 className="font-bold">Click here to upload an file</h2>
          <input
            type="file"
            name="imageFile"
            className="absolute left-0 right-0 top-0 bottom-0 opacity-0"
          />
          {/* Add functionality to tell user that image has been uploaded here */}
        </div>
      </div>
      <div className="modal-action">
        <a href="localhost:3000" className="btn">
          Confirm
        </a>
      </div>
    </div>
  </div>
);

export default FileModal;
