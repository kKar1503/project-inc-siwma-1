import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';

// msg is a prop that has all the messages for the room id

// msg is an array of:
/*
 id bigint,
content bigint,
profile_uuid uuid,
room_id bigint,
status varchar,
content_id bigint,
text varchar,
file varchar,
image varchar,
created_at timestamp with time zone,
offer bigint
 */
const ChatBubbles = ({msg: messages}) => {
  const supabase = useSupabaseClient();
  // const [allMsg, setAllMsg] = useState([]);
  const bottomRef = useRef(null);

  const userdata = useUser();

  // const fetchUserAndMsg = async () => {
  //   const { data: content, error } = await supabase.from('messages').select(`
  //     profile_uuid,
  //     contents (*)
  //   `);

  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(content);
  //     setAllMsg(content);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserAndMsg();
  // }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="overflow-y-scroll" style={{ maxHeight: '73vh' }}>
      <div className="bg-blue-50 items-center">
        {messages.map((msg) => {
          if (msg.text !== null && msg.text !== '') {
            return (
              <div
                className={
                  msg.profile_uuid === userdata.id ? 'flex justify-end mx-5' : 'flex justify-start mx-5'
                }
                key={msg.content_id}
              >
                <div
                  className={
                    msg.profile_uuid === userdata.id
                      ? 'bg-blue-200 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-auto my-3 bottom-2'
                      : 'bg-base-300 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-auto my-3 bottom-2'
                  }
                >
                  <div className="card-body py-4 px-6">
                    <p className="min-w-fit max-w-sm min-[320px]:text-[0.8em] sm:text-[0.8em] md:text-[0.9em] lg:text-[1em] text-blue-700">
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.offer != null) {
            return (
              <div
                className={
                  msg.profile_uuid === userdata.id ? 'flex justify-end mx-5' : 'flex justify-start mx-5'
                }
                key={msg.content_id}
              >
                <div
                  className={
                    msg.profile_uuid === userdata.id
                      ? 'bg-blue-200 rounded-l-2xl rounded-t-2xl w-auto my-3 bottom-2'
                      : 'bg-base-300 rounded-2xl w-auto my-3 bottom-2'
                  }
                >
                  <div className="card-body py-4 px-6">
                    <p className="font-bold text-blue-700">Made an Offer</p>
                    <p className="min-w-fit max-w-sm min-[320px]:text-[0.8em] sm:text-[0.8em] md:text-[0.9em] lg:text-[1em]">
                      SGD {msg.offer}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.image != null) {
            return (
              <div
                className={
                  msg.profile_uuid === userdata.id
                    ? 'flex justify-end mx-5'
                    : 'flex justify-start mx-5'
                }
                key={msg.content_id}
              >
                <div
                  className={
                    msg.profile_uuid === userdata.id
                      ? 'bg-blue-200 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-auto my-3 bottom-2'
                      : 'bg-base-300  rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-auto my-3 bottom-2'
                  }
                >
                  <div className="card-body py-4 px-6">
                    <p className="min-w-fit max-w-sm min-[320px]:text-[0.8em] sm:text-[0.8em] md:text-[0.9em] lg:text-[1em]">
                      <img
                        src={`https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/chat-bucket/${msg.image}`}
                        alt={msg.image}
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.file != null) {
            return (
              <div
                className={
                  msg.profile_uuid === userdata.id
                    ? 'flex justify-end mx-5'
                    : 'flex justify-start mx-5'
                }
                key={msg.content_id}
              >
                <div
                  className={
                    msg.profile_uuid === userdata.id
                      ? 'bg-blue-200 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-auto my-3 bottom-2'
                      : 'bg-base-300  rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-auto my-3 bottom-2'
                  }
                >
                  <div className="card-body py-4 px-6">
                    <Link
                      className="min-w-fit max-w-sm min-[320px]:text-[0.8em] sm:text-[0.8em] md:text-[0.9em] lg:text-[1em] text-blue-700"
                      href={`https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/chat-bucket/${msg.file}`}
                    >
                      {msg.file.split('/')[1]}
                    </Link>
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
