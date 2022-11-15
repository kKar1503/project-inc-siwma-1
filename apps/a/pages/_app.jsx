/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import '@inc/styles/globals.css';
import Header from '../components/header';
import ChatList from '../components/chatList';
import ChatHeader from '../components/chatHeader';
import ChatBubbles from '../components/ChatBubbles';
import InputText from '../components/InputText';

const MyApp = ({ Component, pageProps }) => (
  <div data-theme="">
    <div>
      <Header />
    </div>
    <div className="flex flex-row justify-center">
      <div className="pt-7">
        <ChatList />
      </div>
      <div className="flex flex-col">
        <ChatHeader />
        <div className="border-2 border-slate-500/20">
          <ChatBubbles />
          <div className="pt-5">
            <InputText />
          </div>
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
