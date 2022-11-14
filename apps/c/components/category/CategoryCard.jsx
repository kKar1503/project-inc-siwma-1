// Import prop types
import PropTypes from 'prop-types';

const CategoryCard = ({ img, name, href }) => (
  // can add hover:scale-105 if it looks nicer, i'm not sure if it fits thematically
  <div className="card shadow-md w-1/6 mr-5 transition ease-in-out hover:-translate-y-1">
    <a href={href}>
      <picture className="flex place-content-center">
        <img className="h-[150px] m-5" src={img} alt={name} />
      </picture>
      {/* horizontal line to seperate img and text */}
      <hr
        style={{
          background: 'grey',
          height: '2px',
        }}
      />
      {/* Listing content */}
      <div className="p-2 pb-3">
        <p className="font-bold">{name}</p>
      </div>
    </a>
  </div>
);

CategoryCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
};

export default CategoryCard;
