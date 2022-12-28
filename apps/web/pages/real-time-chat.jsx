/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BiSearch } from 'react-icons/bi';

import '@inc/styles/globals.css';
import IndividualChats from '../components/rtc/IndividualChats';
import InputText from '../components/rtc/InputText';
import ChatBubbles from '../components/rtc/ChatBubbles';
import ImageModal from '../components/rtc/ImageModal';
import FileModal from '../components/rtc/FileModal';
import OfferModal from '../components/rtc/OfferModal';
import UserProfileCard from '../components/rtc/UserProfileCard';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const RealTimeChat = () => {
  const [allMessages, setAllMessages] = useState([]);
  const fetchMessages = async () => {
    const { data: content, error } = await supabase.from('contents').select('*');

    if (error) {
      console.log('error', error);
    } else {
      console.log(content);
      setAllMessages(content);
    }
  };

  useEffect(() => {
    fetchMessages();

    supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'contents' },
        (payload) => {
          console.log('Change received!', payload);
          setAllMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4 h-screen">
      <div className="col-span-3 bg-blue-50 rounded-3xl h-screen">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="font-bold text-2xl">Conversations</h2>
            <p className="font-bold text-gray-300">24 ACTIVE CHATS DETECTED</p>
          </div>
          <div className="flex items-center">
            <div className="dropdown mx-2">
              <label tabIndex={0} className="btn m-1">
                CHAT FILTER
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="localhost">Filter 1</a>
                </li>
                <li>
                  <a href="localhost">Filter 2</a>
                </li>
              </ul>
            </div>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Chat History"
                  className="input input-bordered"
                  style={{
                    borderTopLeftRadius: 'var(--rounded-btn, 0.5rem) !important;',
                    borderBottomLeftRadius: 'var(--rounded-btn, 0.5rem) !important;',
                  }}
                />
                <button
                  className="btn btn-square"
                  style={{
                    borderTopRightRadius: 'var(--rounded-btn, 0.5rem) !important;',
                    borderBottomRightRadius: 'var(--rounded-btn, 0.5rem) !important;',
                  }}
                >
                  <BiSearch className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div
            className="bg-slate-200 py-3 px-1 rounded-r-3xl overflow-y-scroll"
            style={{ maxHeight: '85vh' }}
          >
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
            <IndividualChats />
          </div>
          <div className="col-span-2 relative" style={{ maxHeight: '85vh' }}>
            <div>
              <ChatBubbles msg={allMessages} />
            </div>
            <div className="absolute bottom-0 w-full px-4">
              <hr style={{ border: '1px solid #A0A0A0' }} />
              <InputText msg={allMessages} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 relative">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-xs font-bold text-blue-500">order 29380</p>
            <h6 className="uppercase text-2xl font-bold">
              $5940.<span className="text-gray-200">95</span>
            </h6>
          </div>
          <div className="bg-blue-500 rounded-lg py-2 px-2">
            <p className="text-white text-lg font-bold">In Progress</p>
          </div>
        </div>
        <h6 className="mt-6 font-bold text-xl">Details</h6>
        <div className="tabs tabs-boxed flex justify-evenly mt-2">
          <a className="tab" href="localhost:1111">
            Seller
          </a>
          <a className="tab tab-active" href="localhost:1111">
            Item
          </a>
        </div>
        <div className="mt-4">
          <UserProfileCard />
        </div>
        <div className="flex justify-between items-center gap-1 mt-4 absolute bottom-4 w-11/12">
          <button className="btn btn-info bg-opacity-30">MAKE OFFER</button>
          <button className="btn btn-error bg-opacity-30">REPORT USER</button>
        </div>
      </div>
      <ImageModal />
      <FileModal />
      <OfferModal />
    </div>
  );
};

export default RealTimeChat;
