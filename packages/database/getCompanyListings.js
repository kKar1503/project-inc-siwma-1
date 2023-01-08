/**
 * Retrieves information pertaining to a certain company
 * @param {{ supabase: object, companyid: number, getAdminComment: boolean}}
 * @param {object} supabase The supabase instance
 * @param {number} companyid The id of the company
 * @returns {{}} Company info
 */
const getCompanyListings = ({ supabase, companyid }) => {
  // Construct the base query to select user UUIDS
  //   const query = supabase.from('users').select('id').eq('companyid', 5);
  //   const query = (supabase.from('users').select('id').eq('companyid', 5));
  const query = supabase.from('listing').select(`*`).eq('owner', '7bc2b79e-8eb9-4a44-9656-58327d75a0cb');

  // Return the query result
  return query;
};

export default getCompanyListings;
