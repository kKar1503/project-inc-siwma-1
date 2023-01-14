/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const OfferModal = ({ roomID }) => {
  const supabase = useSupabaseClient();
  const [offerPrice, setOfferPrice] = useState(0);
  const [user, setUser] = useState('');
  const userdata = useUser();

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
        room_id: roomID,
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
        <h6 className="font-bold text-xl mb-4 text-center">Make an offer!</h6>
        <div className="flex justify-center">
          <div className="form-control">
            <label className="input-group w-100">
              <input
                type="number"
                placeholder="10"
                min="0"
                className="input input-bordered"
                value={offerPrice}
                onChange={handleChange}
                style={{
                  borderTopLeftRadius: 'var(--rounded-btn, 0.5rem) !important',
                  borderBottomLeftRadius: 'var(--rounded-btn, 0.5rem) !important',
                }}
              />
              <span
                className='bg-green-500 font-bold text-white'
                style={{
                  borderTopRightRadius: 'var(--rounded-btn, 0.5rem) !important',
                  borderBottomRightRadius: 'var(--rounded-btn, 0.5rem) !important',
                }}
              >
                SGD
              </span>
            </label>
          </div>
        </div>
        <div className="modal-action">
          <div className="grid grid-cols-2 gap-4 w-full">
            <button className="btn bg-blue-700 hover:bg-blue-400 text-white border-none p-4" onClick={handleOffer}>
              Make Offer
            </button>
            <a href="#" className="btn bg-red-700 hover:bg-red-400 border-none text-white">
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

OfferModal.propTypes = {
  roomID: PropTypes.number.isRequired,
};

export default OfferModal;
