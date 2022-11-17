/**
 * Retrieves all companies
 * @param {{ supabase: object, from: number, to: number, matching: string}}
 * @param {object} supabase The supabase instance
 * @param {number} from The index to start from
 * @param {number} to The index to retrieve until
 * @param {string} matching Filter out companies with names that are unlike the string
 * @returns Companies that match the criterias given
 */
const getAllCompanies = ({ supabase, from, to, matching }) => {
  // Construct the base query
  const query = supabase.from('companies').select('*').order('name', { ascending: true });

  // Add a range filter if the user provides both 'from' and 'to' values
  if (from != null && to != null) {
    query.range(from, to);
  }

  // Add a case-insensitive like selector if the user provides a 'matching' value
  if (matching) {
    query.ilike('name', `%${matching}%`);
  }

  // Return the query result
  return query;
};

export default getAllCompanies;
