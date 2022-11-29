import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useCopy = (listingId) => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const dbQuery = async () => {
      const listingPromise = supabaseClient
        .from('listing')
        .select(
          `
          id,
					name,
					description,
					price,
					unit_price,
					negotiable,
					category,
					type
          `
        )
        .eq('id', listingId);
      const paramPromise = supabaseClient
        .from('listings_parameters_value')
        .select(
          `param: parameter(id, datatype),
					value`
        )
        .eq('listing', listingId);
      Promise.all([listingPromise, paramPromise])
        .then(([_listingData, _paramData]) => {
          const paramData = _paramData.data.map((v) => {
            let value;
            switch (v.param.datatype) {
              case 2:
                value = parseInt(v.value, 10);
                break;
              case 3:
                value = v.value === 'true';
                break;
              default:
                value = v.value;
            }
            return { id: v.param.id, datatype: v.param.datatype, value };
          });
          setListing({ ..._listingData.data[0], params: paramData });
        })
        .catch((e) => setError(e));
    };
    dbQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [listing, error];
};

export default useCopy;
