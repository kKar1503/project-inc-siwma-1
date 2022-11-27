/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { AiOutlineSend, AiOutlinePaperClip } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const InputTextArea = () => {
  const [messages, setMessages] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(messages);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    // INSERT a row to content table from column 'text'
    const { data, error: insertErr } = await supabase.from('contents').insert([{ text: messages }]);
    if (insertErr) {
      console.log('error', insertErr);
    } else {
      console.log('no error');
    }

    // GET all content_id
    const { data: contentId, error: selectErr } = await supabase
      .from('contents')
      .select('content_id');
    if (selectErr) {
      console.log('error', selectErr);
    } else {
      console.log('no error');
    }

    // INSERT content_id into 'messages' table
    // TODO: Change the profile_uuid value to user.id
    const { msg, error: insertMsgErr } = await supabase.from('messages').insert([
      {
        content: contentId[contentId.length - 1].content_id,
        profile_uuid: 'c078a5eb-e75e-4259-8fdf-2dc196f06cbd',
      },
    ]);

    if (insertMsgErr) {
      console.log('error', insertMsgErr);
    } else {
      console.log('no error');
      setMessages('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2 h-20">
        <div className="pt-4">
          <button type="select">
            <BsEmojiSmile size={20} />
          </button>
        </div>
        <input
          value={messages}
          type="text"
          placeholder="Type here"
          className="input input-bordered rounded-3xl w-full"
          onChange={(e) => {
            setMessages(e.target.value);
          }}
        />

        <div className="dropdown dropdown-top dropdown-end mx-4">
          <label tabIndex={0} className="btn btn-active btn-ghost">
            <AiOutlinePaperClip size={24} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
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
    </form>
  );
};

export default InputTextArea;
