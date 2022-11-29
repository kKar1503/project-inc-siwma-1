/**
 * Retrieves information pertaining to a certain company
 * @param {{ supabase: object, companyid: number, getAdminComment: boolean}}
 * @param {object} supabase The supabase instance
 * @param {number} companyid The id of the company to retrieve information for
 * @param {boolean} getAdminComment Whether or not to retrieve the admin comment (Supabase client performing the query must fulfil RLS restrictions)
 * @returns {{}} Company info
 */
const getCompany = ({ supabase, companyid, getAdminComment }) => {
  // Construct the base query, which retrieves the admin comment if specified
  const query = supabase.from('companies').select('*').eq('id', companyid);

  // Retrieve company info with admin comments
  if (getAdminComment) {
    query.select('*, companies_comments(*)');
  } else {
    // Retrieve company info only
    query.select('*');
  }

  // Return the query result
  return query;
};

export default getCompany;
