import React from 'react';

const Advertisement = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        htmlFor="my-modal-4"
        onClick={handleClick}
        onKeyPress={handleClick}
        role="button"
        tabIndex={0}
      >
        <picture>
          <img
            src="https://via.placeholder.com/1500x500"
            className="object-cover w-full h-[200px]"
            alt="Banner"
          />
        </picture>
      </div>

      {open ? (
        <div className="modal" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
            <p className="py-4">
              You have been selected for a chance to get one year of subscription to use Wikipedia
              for free!
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Advertisement;
