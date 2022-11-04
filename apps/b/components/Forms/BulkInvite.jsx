import FileUpload from '../FileUpload';

const BulkInvite = () => (
  <div>
    <input type="checkbox" id="bulk-invite" className="modal-toggle" />
    <label htmlFor="bulk-invite" className="modal cursor-pointer">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="" className="modal-box rounded-xl max-w-4xl">
        <label
          htmlFor="bulk-invite"
          className="text-lg absolute right-4 top-2 hover:cursor-pointer"
        >
          ✕
        </label>
        <FileUpload />
      </label>
    </label>
  </div>
);

export default BulkInvite;
