/* eslint-disable react/jsx-props-no-spreading */
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import '@inc/styles/globals.css';
import Header from '@inc/ui/Header';
import PropTypes from 'prop-types';
import ChatBubbles from '../components/rtc/ChatBubbles';
import ChatHeader from '../components/rtc/ChatHeader';
import ChatList from '../components/rtc/ChatList';
import FileModal from '../components/rtc/FileModal';
import ImageModal from '../components/rtc/ImageModal';
import InputText from '../components/rtc/InputText';
import OfferModal from '../components/rtc/OfferModal';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const MyApp = ({ Component, pageProps }) => {
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
    <div data-theme="">
      <div>
        <Header />
      </div>
      <div className="flex flex-row max-h-screen">
        <div className="min-[320px]:hidden sm:hidden md:flex lg:flex">
          <ChatList />
        </div>
        <div className="drawer md:hidden lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <div className="flex flex-col min-[320px]:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%]">
              <ChatHeader />
              <div className="border-2 border-slate-500/20 max-h-screen">
                <ChatBubbles />
              </div>
              <div className="border-2 border-slate-500/20 pl-5 pr-5 pt-5">
                <InputText />
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay">
              Chat List
            </label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">
              <ChatList />
            </ul>
          </div>
        </div>
        <div className="flex flex-col min-[320px]:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] min-[320px]:hidden md:flex">
          <ChatHeader />
          <div className="border-2 border-slate-500/20 overflow-y-scroll">
            <ChatBubbles msg={allMessages} />
          </div>
          <div className="border-2 border-slate-500/20 p-5 bottom-0">
            <InputText msg={allMessages} />
          </div>
        </div>
      </div>
      <ImageModal />
      <FileModal />
      <OfferModal />
    </div>
  );
};

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};

MyApp.allowAuthenticated = true;

export default MyApp;
