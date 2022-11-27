/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import '@inc/styles/globals.css';
import Header from '@inc/ui/Header';
import ChatList from '../components/rtc/ChatList';
import ChatHeader from '../components/rtc/ChatHeader';
import ChatBubbles from '../components/rtc/ChatBubbles';
import InputText from '../components/rtc/InputText';

const MyApp = ({ Component, pageProps }) => (
  <div data-theme="">
    <div>
      <Header />
    </div>
    <div className="flex flex-row">
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
        <div className="border-2 border-slate-500/20 max-h-screen">
          <ChatBubbles />
        </div>
        <div className="border-2 border-slate-500/20 pl-5 pr-5 pt-5">
          <InputText />
        </div>
      </div>
    </div>
  </div>
);

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};

export default MyApp;
