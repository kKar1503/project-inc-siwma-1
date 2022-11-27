import { IoSendSharp } from 'react-icons/io5';
import { GrAttachment } from 'react-icons/gr';
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

    <button type="select" className="pb-8">
      <GrAttachment size={20} />
    </button>

    <button type="submit" className="pb-8 pl-3">
      <IoSendSharp size={20} />
    </button>
  </div>
);

export default InputTextArea;
