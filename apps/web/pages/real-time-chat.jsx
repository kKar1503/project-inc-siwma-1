/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import '@inc/styles/globals.css';
import InputText from '../components/rtc/InputText';
import ChatBubbles from '../components/rtc/ChatBubbles';
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

  const filterChatList = (filter) => filter.type === selectedFilter;

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
