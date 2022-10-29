import { MostPostsBarChart } from '@inc/charts';

const mockData = [
  { company: 'A&G EQUIPMENT PTE.LTD.', posts: 32 },
  { company: 'ACE-WELD PTE.LTD.', posts: 25 },
  { company: 'FUJIN PTE.LTD.', posts: 26 },
  { company: 'HANWA SINGAPORE (PTE.)LTD.', posts: 23 },
];

const Home = () => (
  <div className="w-96">
    <MostPostsBarChart data={mockData} />
  </div>
);

export default Home;
