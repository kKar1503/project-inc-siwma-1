/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const OfferModal = () => {
  const supabase = useSupabaseClient();
  const [offerPrice, setOfferPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState('');
  const userdata = useUser();

  const handleClick = () => {
    setIsVisible((current) => !current);
  };
  const [submitted, setSubmitted] = useState('');

  function handleChange(e) {
    setOfferPrice(e.target.value);
  }

  const handleOffer = async (e) => {
    e.preventDefault();

    setUser(userdata.id);
    try {
      const { data, error: insertError } = await supabase
        .from('contents')
        .insert([{ offer: offerPrice }]);

      const offerModal = document.querySelector('#offer-modal');

      offerModal.style.display = 'none';
    } catch (err) {
      alert(err);
    }

    // GET all content_id
    const { data: contentId, error: selectErr } = await supabase
      .from('contents')
      .select('content_id');
    if (selectErr) {
      console.log('error', selectErr);
    } else {
      console.log('no error');
    }

    // INSERT content_id into 'messages' table
    // TODO: Change the profile_uuid value to user.id
    const { msg, error: insertMsgErr } = await supabase.from('messages').insert([
      {
        content: contentId[contentId.length - 1].content_id,
        profile_uuid: userdata.id,
      },
    ]);

    if (insertMsgErr) {
      console.log('error', insertMsgErr);
    } else {
      console.log('no error');
    }
  };

  return (
    <div className="modal" id="offer-modal">
      <div className="modal-box">
        {isVisible ? (
          <div className="form-control ml-4">
            <div>
              <div className="label">
                <span className="label-text">Enter Amount</span>
              </div>
              <form>
                <span>SGD</span>
                <input
                  type="number"
                  min="0"
                  placeholder="100"
                  className="input input-bordered input-sm w-full max-w-xs m-1"
                  value={offerPrice}
                  onChange={handleChange}
                />

                <div className="modal-action">
                  <button className="btn p-4" onClick={handleOffer}>
                    Make Offer
                  </button>
                  <a href="#" className="btn">
                    Close
                  </a>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <button onClick={handleClick} className="btn btn-sm m-3">
            Make Offer
          </button>
        )}
      </div>
    </div>
  );
};

export default OfferModal;
