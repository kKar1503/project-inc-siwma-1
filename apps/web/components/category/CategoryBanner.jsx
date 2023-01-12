// Import prop types
import PropTypes from 'prop-types';
import { Search } from '@inc/ui';
import { useRouter } from 'next/router';

const CategoryBanner = ({ img, name }) => {
  const router = useRouter();

  const redirectSearch = (search) => {
    router.push('/search?search=' + search);
  };

  return (
    <div
      style={{
        backgroundImage: `url("${img}")`,
      }}
      className="object-scale-down w-full rounded-lg h-64 bg-cover flex justify-center items-center"
    >
      <div className="w-4/5">
        <Search searchCallback={redirectSearch} />
      </div>
    </div>
  );
};

CategoryBanner.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};

export default CategoryBanner;
