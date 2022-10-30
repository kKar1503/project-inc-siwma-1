import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ items }) => {
  const [text, setText] = React.useState('Select an Category');

  const onSelect = async (event) => {
    event.preventDefault();

    setText(event.target.innerText);
  };

  return (
    <div className="dropdown">
      <button className="btn m-1">{text}</button>
      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {items.map((item) => (
          <li key={item}>
            <button onClick={onSelect}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;
