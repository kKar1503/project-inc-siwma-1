import { Search } from '@inc/ui';

const SearchPage = () => {
  const myF = (search) => {
    console.log(search);
  };
  const myF2 = (focus) => {
    console.log(focus ? 'yes' : 'no');
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Search searchCallback={myF} focusCallback={myF2} />
    </div>
  );
};

export default SearchPage;
