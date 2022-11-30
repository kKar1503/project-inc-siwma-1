import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

const Advertisement = ({ adData }) => {
  const supabase = useSupabaseClient();

  const { data, status, isLoading, error } = useQuery({
    queryKey: ['getCompany'],
    queryFn: async () => supabase.from('companies').select('*').eq('id', `${adData.company_id}`),
  });
  // Count the number of clicks of the advertisement banners
  // This is used to determine engagement rate
  // Will be used in the future to determine the ranking of the advertisement in the dashboards
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
    // console.log(count);
  };

  return (
    <>
      <div onClick={handleCount} onKeyPress={handleCount} role="button" tabIndex={0}>
        <label htmlFor={`modal-${adData.id}`} className="image">
          <picture>
            <img
              src="https://images.unsplash.com/photo-1598638567141-696be94b464a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              className="object-cover"
              alt="Banner"
            />
          </picture>
        </label>
      </div>

      <input type="checkbox" id={`modal-${adData.id}`} className="modal-toggle" />
      <label htmlFor={`modal-${adData.id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="placeholder">
          <h3 className="text-lg font-bold text-center">{isLoading ? null : data.data[0].name}</h3>
          <p className="py-4">{adData.description}</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Show me!
            </label>
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
  }),
};

export default Advertisement;
