const getUser = ({ supabase, userid, getAdminContent }) => {
  const query = supabase.from('users').select(`*, companies:companyid(name)`).eq('id', userid);
  if (getAdminContent) {
    query.select(`*, companies:companyid(name), users_comments(*)`);
  } else {
    query.select('*');
  }
  return query;
}

export default getUser;