/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';

import '@inc/styles/globals.css';
import InputText from '../components/rtc/InputText2';
import ChatBubbles from '../components/rtc/ChatBubbles2';
import ImageModal from '../components/rtc/ImageModal';
import FileModal from '../components/rtc/FileModal';
import OfferModal from '../components/rtc/OfferModal';
import ChatSidebar from '../components/rtc/ChatSidebar';
import ItemDetails from '../components/rtc/ItemDetails';
import ChatFilter from '../components/rtc/ChatFilter';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const roomsData = [
  {
    id: 1,
    name: 'Adeeb',
    lastMessage: '',
    type: 'Buying',
    ischeck: false,
  },
  {
    id: 2,
    name: 'Javier',
    lastMessage: '',
    type: 'Selling',
    ischeck: false,
  },
  {
    id: 3,
    name: 'George',
    lastMessage: '',
    type: 'Selling',
    ischeck: false,
  },
  {
    id: 4,
    name: 'Shelby',
    lastMessage: '',
    type: 'Buying',
    ischeck: false,
  },
  {
    id: 5,
    name: 'Louis',
    lastMessage: '',
    type: 'Selling',
    ischeck: false,
  },
  {
    id: 6,
    name: 'Charmaine',
    lastMessage: '',
    type: 'Buying',
    ischeck: false,
  },
];

const options = ['All Chats', 'Selling', 'Buying', 'Archived'];

const RealTimeChat = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [filteredData, setFilteredData] = useState(roomsData);
  const [selectedFilter, setSelectedFilter] = useState(options[0]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [notifs, setAllNotifs] = useState('');
  const [user, setUser] = useState('');

  const filterChatList = (filter) => filter.type === selectedFilter;
  // Function to get logged in user
  const getUser = async () => {
    const {
      data: { userData },
    } = await supabase.auth.getUser();
    console.log(userData);
    setUser('0c54e181-79e4-41e0-b6c4-ab3c8e422996');
  };

  const retrieveFilteredData = () => {
    console.log(roomsData);
    console.log(selectedFilter);
    if (selectedFilter === 'All Chats') {
      setFilteredData(roomsData);
    } else {
      setFilteredData(roomsData.filter(filterChatList));
    }
    console.log(filteredData);
  };

  const fetchMessages = async () => {
    const { data: content, error } = await supabase.from('contents').select('*');

    if (error) {
      console.log('error', error);
    } else {
      console.log(content);
      setAllMessages(content);
    }
  };

  // Function to fetch last message and to check if message was sent by current user
  // if not, system triggers an alert (acts as notif for now)

  // TO DO: Change the alert to react hot toast
  const fetchLastMsg = async (id) => {
    const { data, error } = await supabase.from('messages').select().eq('content', id);

    if (error) {
      console.log('error', error);
    } else {
      console.log(data);
      const userid = data[0].profile_uuid;

      if (notifs !== '' && userid !== user) {
        if (notifs.text != null) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
                    <p className="mt-1 text-sm text-gray-500">{notifs.text}</p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
          setAllNotifs('');
        }
      }
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
          setAllNotifs(payload.new);
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    getUser();
    fetchLastMsg(notifs.content_id);
  }, [notifs]);

  return (
    <div className="grid grid-cols-4 gap-4 h-screen">
      <Toaster />
      <div className="col-span-3 bg-blue-50 rounded-3xl h-screen">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="font-bold text-2xl">Conversations</h2>
            <p className="font-bold text-gray-300">24 ACTIVE CHATS DETECTED</p>
          </div>
          <ChatFilter
            options={options}
            setSelectedFilter={setSelectedFilter}
            retrieveFilteredData={retrieveFilteredData}
            selectedFilter={selectedFilter}
          />
        </div>
        <div className="grid grid-cols-3">
          <ChatSidebar roomsData={filteredData} />
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
        <ItemDetails />
      </div>
      <ImageModal />
      <FileModal />
      <OfferModal />
    </div>
  );
};

export default RealTimeChat;
