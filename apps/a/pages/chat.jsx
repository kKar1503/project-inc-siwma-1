import InputTextArea from '../components/InputText';
// import ChatDiv from '../components/chatDiv';
import ChatList from '../components/chatList';
import Header from '../components/header';
import ChatBubbles from '../components/ChatBubbles';
import ChatHeader from '../components/chatHeader';

const Chat = () => (
  <div className="Header">
    <Header />

    <div className="chatList">
      <ChatList />
      <ChatHeader />
    </div>

    <div className="chatBubbles">
      <ChatBubbles />
    </div>
    <div className="InputTextArea">
      <InputTextArea />
    </div>
  </div>
);

export default Chat;
