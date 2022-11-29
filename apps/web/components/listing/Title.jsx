import PropTypes from 'prop-types';

const Title = ({ children, title }) => (
  <div className="flex flex-row space-x-4 items-center">
    <h1 className="text-3xl">{title}</h1>
    {children}
  </div>
);

Title.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default Title;
