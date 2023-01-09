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
  // const query = supabase.from('listing').select(`name, users(companyid)`).eq(`users.companyid`, 21);
  const query = supabase.rpc('get_company_listings', { companyid2: companyid });
  //   const query = supabase.from('listing').select(`*`).eq('owner', '022f64fa-3e2b-42e8-8ec0-6d845c3bac26');

  // Return the query result
  return query;
};

export default getCompanyListings;
