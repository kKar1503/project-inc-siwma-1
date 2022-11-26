import { useState } from 'react';

const ChatOffer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible((current) => !current);
  };

  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    console.log(submitted);
    e.preventDefault();
    setSubmitted(text);
    setText('');
  }

  return (
    <div>
      <button onClick={handleClick} className="btn btn-sm m-3">
        Make Offer
      </button>

      {isVisible && (
        <div className="form-control ml-4">
          <div>
            <div className="label">
              <span className="label-text">Enter Amount</span>
            </div>
            <form onSubmit={handleSubmit}>
              <span>SGD</span>
              <input
                type="number"
                min="0"
                placeholder="100"
                className="input input-bordered input-sm w-full max-w-xs m-1"
                value={text}
                onChange={handleChange}
              />
              <input type="submit" className="btn btn-sm m-1" value="Make Offer" />
              <input type="submit" className="btn btn-sm btn-error m-2" value="Cancel" />
            </form>
            SGD {submitted}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatOffer;
