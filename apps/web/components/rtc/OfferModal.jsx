import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const OfferModal = () => {
  const supabase = useSupabaseClient();
  const [offerPrice, setOfferPrice] = useState(0);

  const onPriceChange = (e) => {
    setOfferPrice(e.target.value);
  };

  const handleOffer = async () => {
    try {
      const { data, error: insertError } = await supabase
        .from('contents')
        .insert([{ offer: offerPrice }]);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="modal" id="offer-modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Offer a price to --Name--</h3>
        <input
          type="number"
          placeholder={offerPrice}
          className="input input-bordered input-ghost w-full max-w-xs"
          onChange={onPriceChange}
        />
        <div className="modal-action">
          <button className="btn-primary text-white p-2 rounded-md" onClick={handleOffer}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
