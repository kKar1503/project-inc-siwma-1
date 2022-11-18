/**
 * Retrieves the total number of companies
 * @param {{ supabase: object, matching: string}}
 * @param {object} supabase The supabase instance
 * @param {string} matching Filter out companies with names that are unlike the string
 * @returns {number} Number of companies that match the criteria given
 */
const getCompanyCount = ({ supabase, matching }) => {
  // Construct the base query
  const query = supabase.from('companies').select('*', { count: 'exact', head: true });

  // Add a case-insensitive like selector if the user provides a 'matching' value
  if (matching) {
    query.ilike('name', `%${matching}%`);
  }

  // Return the query result
  return query;
};

export default getCompanyCount;
