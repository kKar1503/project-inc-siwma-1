import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

/**
 * Tooltip component
 *
 * @param {{children: React.ReactNode; content: React.ReactNode; position: "top" | "bottom" | "left" | "right", contentClassName?: string}} { children, content, position = 'bottom', contentClassName }
 * @description Content is the items that will be shown when hovering over the children. contentClassName is the class name that will be applied to the content box.
 * @return {React.FC}
 */
const Tooltip = ({ children, content, position = 'bottom', contentClassName }) => {
  const [show, setShow] = useState(false);

  const genPosClassNames = (pos) => {
    const p = '10';
    switch (pos) {
      case 'top':
        return `bottom-[${p}px]`;
      case 'bottom':
        return `top-[${p}px]`;
      case 'left':
        return `right-[${p}px]`;
      case 'right':
        return `left-[${p}px]`;
      default:
        return `top-[${p}px]`;
    }
  };

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="">
      {children}

      <div
        className={classNames('absolute inline-block', {
          [genPosClassNames(position)]: true,
          [contentClassName]: contentClassName,
          hidden: !show,
        })}
      >
        {content}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  contentClassName: PropTypes.string,
};

export default Tooltip;
