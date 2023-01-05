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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // INSERT a row to content table from column 'text'
    if (messages !== '') {
      const { data, error: insertErr } = await supabase
        .from('contents')
        .insert([{ text: messages }]);
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2 h-20 items-center">
        <div className="dropdown dropdown-top dropdown-end">
          <label tabIndex={0} className="btn btn-ghost hover:bg-opacity-0">
            <AiOutlinePaperClip size={24} className="text-gray-400 hover:text-blue-300" />
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
          </ul>
        </div>
        <input
          value={messages}
          type="text"
          placeholder="Start typing your message..."
          className="input rounded-3xl w-full bg-transparent"
          onChange={(e) => {
            setMessages(e.target.value);
          }}
        />
        <button className="btn btn-ghost hover:bg-opacity-0">
          <AiOutlineSend size={24} className="text-gray-400 hover:text-blue-300" />
        </button>
      </div>
    </form>
  );
};

export default InputTextArea;
