// Import prop types
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * CategoryListingItem is a component that displays a category listing item.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */

const CategoryListingItem = ({ img, name, href }) => (
  <Link href={href}>
    <div className="card relative rounded-md">
      <div className="aspect-square object-cover h-[150px]">
        {/* Actual image */}
        {img && <Image src={img} fill alt={name} className="object-cover" />}

        {/* Overlay gradient */}
        <div className="bg-gradient-to-b from-transparent to-black/40 w-full h-full z-10 absolute top-0 left-0" />
      </div>

      {/* Category text */}
      <p className="absolute z-10 bottom-0 text-center w-full mb-3 text-white">{name}</p>
    </div>
  </Link>
);

CategoryListingItem.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
};

export default CategoryListingItem;
