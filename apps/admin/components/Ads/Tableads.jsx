// import { useQuery } from 'react-query';
// import { createServiceSupabaseClient } from '@inc/utils';

// const Tableads = () => {

//   const supabaseClient = createServiceSupabaseClient();
//   const fetchAds = async () => supabaseClient.from('active_ads').select('*');

//   const { data, isFetching } = useQuery('active_ads', fetchAds);
//   console.log(data)
//   return (
//     <table className="table table-compact w-full">
//       <thead>
//         <tr>
//           <th>User</th>
//           <th>E-mail</th>
//           <th>Company</th>
//           <th>Mobile number</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {isFetching || data.map(({ id, name, email, company, tel }) => (
//           <tr key={id}>
//             <td>{name}</td>
//             <td>{email}</td>
//             <td>{company}</td>
//             <td>{tel}</td>
//             <th>
//               <button className="btn btn-ghost btn-xs">details</button>
//             </th>
//           </tr>
//         ))}
//         <tr className="active">
//           <td />
//           <td />
//           <td>Inactive ad-space</td>
//           <td />
//           <td />
//         </tr>
//       </tbody>
//     </table>

//   )

// }

// export default Tableads
