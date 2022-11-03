import { IoSendSharp } from 'react-icons/io5';
import { GrAttachment } from 'react-icons/gr';
import { BsEmojiSmile } from 'react-icons/bs';
// import EmojiComp from './EmojiComp';

const InputTextArea = () => (
  <div className="flex space-x-2">
    {/* <div className="pt-4">
  <button type="select" onClick={handleEmoji}>
    <BsEmojiSmile size={20} />
    <div className={showChild ? 'block' : 'hidden'}>
      <EmojiComp />
    </div>
  </button>
</div> */}
    <div className="pt-4">
      <button type="select">
        <BsEmojiSmile size={20} />
      </button>
    </div>

    <div>
      <input
        type="text"
        placeholder="Type a message"
        className="input input-bordered w-full max-w-xs rounded-3xl w-200"
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

// className='grid h-300 card bg-base-300 rounded-box place-items-center'

export default InputTextArea;
