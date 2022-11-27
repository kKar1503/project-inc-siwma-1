import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ChatBubbles = (messages) => {
  const [user, setUser] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const bottomRef = useRef(null);

  const getUser = async () => {
    const {
      data: { userData },
    } = await supabase.auth.getUser();
    console.log(userData);
    setUser('c078a5eb-e75e-4259-8fdf-2dc196f06cbd');
  };

  const fetchUserAndMsg = async () => {
    const { data: content, error } = await supabase.from('messages').select(`
      profile_uuid,
      contents (*)
    `);

    if (error) {
      console.log(error);
    } else {
      console.log(content);
      setAllMsg(content);
    }
  };

  useEffect(() => {
    getUser();
    fetchUserAndMsg();
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, allMsg]);

  return (
    <div>
      <div className="bg-slate-50 items-center">
        {allMsg.map((msg) => {
          if (msg.contents.text != null) {
            return (
              <div
                className={
                  msg.profile_uuid === user ? 'flex justify-end mx-5' : 'flex justify-start mx-5'
                }
                key={msg.contents.content_id}
              >
                <div
                  className={
                    msg.profile_uuid === user
                      ? 'bg-info rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-auto my-3 bottom-2'
                      : 'bg-base-300 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-auto my-3 bottom-2'
                  }
                >
                  <div className="card-body py-4 px-6">
                    <p className="min-w-fit max-w-sm min-[320px]:text-[0.8em] sm:text-[0.8em] md:text-[0.9em] lg:text-[1em]">
                      {msg.contents.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.contents.offer != null) {
            return (
              <div
                className={
                  msg.profile_uuid === user ? 'flex justify-end mx-5' : 'flex justify-start mx-5'
                }
                key={msg.contents.content_id}
              >
                <div
                  className={
                    msg.profile_uuid === user
                      ? 'bg-info rounded-2xl w-auto my-3 bottom-2'
                      : 'bg-base-300 rounded-2xl w-auto my-3 bottom-2'
                  }
                >
                  <div className="card-body py-4 px-6">
                    <p className="font-bold">Made an Offer</p>
                    <p className="min-w-fit max-w-sm min-[320px]:text-[0.8em] sm:text-[0.8em] md:text-[0.9em] lg:text-[1em]">
                      SGD {msg.contents.offer}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.contents.image != null) {
            return (
              <div
                className={
                  msg.profile_uuid === user ? 'flex justify-end mx-5' : 'flex justify-start mx-5'
                }
                key={msg.contents.content_id}
              >
                <div
                  className={
                    msg.profile_uuid === user
                      ? 'bg-info rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-auto my-3 bottom-2'
                      : 'bg-base-300  rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-auto my-3 bottom-2'
                  }
                >
                  <div className="card-body py-4 px-6">
                    <p className="min-w-fit max-w-sm min-[320px]:text-[0.8em] sm:text-[0.8em] md:text-[0.9em] lg:text-[1em]">
                      <img
                        src={`https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/chat-bucket/${msg.contents.image}`}
                        alt=""
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          return '';
        })}
      </div>

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBubbles;