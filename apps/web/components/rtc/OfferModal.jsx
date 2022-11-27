const OfferModal = () => (
  <div className="modal" id="offer-modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-4">Offer a price to // Name of seller //</h3>
      <input type="text" placeholder="Type here" className="input input-ghost w-full max-w-xs" />
      <div className="modal-action">
        <a href="localhost:3000" className="btn">
          Confirm
        </a>
      </div>
    </div>
  </div>
);

export default OfferModal;
