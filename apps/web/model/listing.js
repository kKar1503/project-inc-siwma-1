// ! Please ignore this file, it will be removed in the next release.

import supabase from '../utils/supabase';

const Listing = {
  getListings: async (offset, limit) => {
    const { data, error } = await supabase.rpc('get_listings', {
      item_offset: offset,
      item_limit: limit,
    });
    if (error) throw error;
    return data;
  },

  getTotalNumberOfOpenListings: async () => {
    const { data, error } = await supabase.rpc('get_total_open_listings');
    if (error) throw error;
    return data;
  },
};

export default Listing;
