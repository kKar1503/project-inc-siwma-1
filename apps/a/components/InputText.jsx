import { IoSendSharp } from 'react-icons/io5';
import { GrAttachment } from 'react-icons/gr';
import { BsEmojiSmile } from 'react-icons/bs';

const InputTextArea = () => (
  <div className="flex space-x-2 pl-2 h-20">
    <div className="pt-4">
      <button type="select">
        <BsEmojiSmile size={20} />
      </button>
    </div>

    <div>
      <input
        type="text"
        placeholder="Type a message"
        className="input input-bordered rounded-3xl w-[590px]"
      />
    </div>

    <div className="pt-4">
      <button type="select" className="mr-5">
        <GrAttachment size={20} />
      </button>

      <button type="submit">
        <IoSendSharp size={20} />
      </button>
    </div>
  </div>
);

export default InputTextArea;
