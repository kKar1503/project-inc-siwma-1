/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { AiOutlineSend, AiOutlinePaperClip } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';

const InputTextArea = () => (
  <div className="flex space-x-2 h-20">
    <div className="pt-4">
      <button type="select">
        <BsEmojiSmile size={20} />
      </button>
    </div>
    <input
      type="text"
      placeholder="Type here"
      className="input input-bordered rounded-3xl w-full"
    />

    <div className="dropdown dropdown-top dropdown-end mx-4">
      <label tabIndex={0} className="btn btn-active btn-ghost">
        <AiOutlinePaperClip size={24} />
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a href="#image-modal" className="btn btn-ghost">
            Upload Image
          </a>
        </li>
        <li className="my-1">
          <a href="#file-modal" className="btn btn-ghost">
            Upload File
          </a>
        </li>
        <li>
          <a href="#offer-modal" className="btn btn-ghost">
            Make an offer
          </a>
        </li>
      </ul>
    </div>
    <button className="btn btn-active btn-ghost">
      <AiOutlineSend size={24} />
    </button>
  </div>
);

export default InputTextArea;
