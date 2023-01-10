import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Advertisement = ({ adData }) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleClick = async () => {
    await supabase.rpc('insert_click', { _advertisement_id: adData.id, _user_uuid: user.id });
  };

  return (
    <>
      <div onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0} className="">
        <label htmlFor={`modal-${adData.id}`} className="image">
          <Image
            src={adData.image_public_url}
            fill
            htmlFor={`modal-${adData.id}`}
            className="object-cover absolute"
          />
        </label>
      </div>

      <input type="checkbox" id={`modal-${adData.id}`} className="modal-toggle" />
      <label htmlFor={`modal-${adData.id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="placeholder">
          <h3 className="text-lg font-bold text-center">{adData.company_name}</h3>
          <p className="py-4">{adData.description}</p>
          <div className="modal-action">
            <Link href={adData.link} htmlFor="my-modal" className="btn">
              Show me!
            </Link>
            <label htmlFor={`modal-${adData.id}`} className="btn">
              Close
            </label>
          </div>
        </label>
      </label>
    </>
  );
};

Advertisement.propTypes = {
  adData: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    company_id: PropTypes.number,
    company_name: PropTypes.string,
    image_public_url: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default Advertisement;
