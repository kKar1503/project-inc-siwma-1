/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-unresolved
// import Autocomplete from 'react-autocomplete';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import toast, { Toaster } from 'react-hot-toast';

import '@inc/styles/globals.css';
import InputText from '../components/rtc/InputText';
import ChatBubbles from '../components/rtc/ChatBubbles';
import ImageModal from '../components/rtc/ImageModal';
import FileModal from '../components/rtc/FileModal';
import OfferModal from '../components/rtc/OfferModal';
import ChatSidebar from '../components/rtc/ChatSidebar';
import ItemDetails from '../components/rtc/ItemDetails';
import ChatFilter from '../components/rtc/ChatFilter';
import Container from '../components/Container';

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
  const supabase = useSupabaseClient();
  const [allMessages, setAllMessages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(options[0]);
  // Select room id of 15
  const [selectedRoom, setSelectedRoom] = useState(38);
  const [notifs, setAllNotifs] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const [newContent, setNewContent] = useState('');

  const filterChatList = (filter) => filter.type === selectedFilter;
  const userdata = useUser();

  const fetchRoomsByUserId = async () => {
    // Set rooms to be
    setFilteredData([]);

    if (userdata == null) {
      console.error('User data is null');
      return;
    }

    // Get chats if i'm a seller
    const chatsIfImSeller = supabase.rpc('get_sidebar_messages_for_user_seller', {
      _user_uuid: userdata.id,
    });

    // Get chats if i'm a buyer
    const chatsIfImBuyer = supabase.rpc('get_sidebar_messages_for_user_buyer', {
      _user_uuid: userdata.id,
    });

    Promise.all([chatsIfImBuyer, chatsIfImSeller]).then(
      ([chatsIfImBuyerData, chatsIfImSellerData]) => {
        let finalBuyerData = [];
        let finalSellerData = [];

        // Stop execution if there is an error
        if (chatsIfImBuyerData.error || chatsIfImSellerData.error) {
          console.error('Something went wrong while fetching chats');
          return;
        }

        // Map the buyer data
        if (chatsIfImBuyerData.data.length > 0) {
          const d = chatsIfImBuyerData.data;
          finalBuyerData = d.map(
            ({
              listing_id: id,
              fullname,
              text,
              file,
              image,
              offer,
              created_at: createdAt,
              room_id: roomID,
            }) => {
              let messageType = '';
              let lastMessage = '';

              if (text !== null) {
                messageType = 'text';
                lastMessage = text;
              }

              if (file !== null) {
                messageType = 'file';
                lastMessage = file;
              }

              if (image !== null) {
                messageType = 'image';
                lastMessage = image;
              }
              if (offer !== null) {
                messageType = 'offer';
                lastMessage = offer;
              }

              return {
                id,
                name: fullname,
                lastMessage,
                messageType,
                type: 'Buying',
                createdAt,
                roomID,
              };
            }
          );
        }

        // Map the seller data
        if (chatsIfImSellerData.data.length > 0) {
          const d = chatsIfImSellerData.data;
          finalSellerData = d.map(
            ({
              listing_id: id,
              fullname,
              text,
              file,
              image,
              offer,
              created_at: createdAt,
              room_id: roomID,
            }) => {
              let messageType = '';
              let lastMessage = '';

              if (text !== null) {
                messageType = 'text';
                lastMessage = text;
              }

              if (file !== null) {
                messageType = 'file';
                lastMessage = file;
              }

              if (image !== null) {
                messageType = 'image';
                lastMessage = image;
              }
              if (offer !== null) {
                messageType = 'offer';
                lastMessage = offer;
              }

              return {
                id,
                name: fullname,
                type: 'Selling',
                lastMessage,
                messageType,
                createdAt,
                roomID,
              };
            }
          );
        }

        // Combine both data together
        let combinedData = [];

        combinedData = [...finalSellerData, ...finalBuyerData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFilteredData(combinedData);
      }
    );
  };

  const retrieveFilteredData = () => {
    if (selectedFilter === 'All Chats') {
      setFilteredData(roomsData);
    } else {
      setFilteredData(roomsData.filter(filterChatList));
    }
  };

  const fetchMessages = async (roomId) => {
    const fetchMessagesData = await supabase.rpc('get_all_messages_for_room_id', {
      _room_id: roomId,
    });

    if (fetchMessagesData.error) {
      console.error('There is an error fetching messages for this room');
      return;
    }

    setAllMessages(fetchMessagesData.data);
  };

  // Function to fetch last message and to check if message was sent by current user
  const fetchLastMsg = async (id) => {
    const { data, error } = await supabase.from('messages').select().eq('content', id);

    if (error) {
      console.log('error', error);
    } else if (data.length !== 0) {
      const userid = data[0].profile_uuid;

      if (notifs !== '' && userid !== userdata.id) {
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
    fetchRoomsByUserId();
  }, [userdata]);

  // Call fetchMessages everytime selectedRoom changes
  useEffect(() => {
    fetchMessages(selectedRoom);

    supabase
      .channel(`public:messages:room_id=eq.${selectedRoom}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          console.log('Change received!', payload);
          setNewMsg(payload.new);
          setAllNotifs(payload.new);
        }
      )
      .subscribe();

    console.log(newMsg);
    console.log(allMessages);

  }, [selectedRoom, newMsg]);

  useEffect(() => {
    fetchLastMsg(notifs.content_id);
  }, [notifs]);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="grid grid-cols-10 gap-4 h-screen drawer-content">
        <Toaster />
        <div className="col-span-10 md:col-span-7 bg-blue-50 rounded-3xl h-screen drawer-content">
          <div className="md:flex border-b-4 items-center md:px-6 md:py-4">
            <div className="hidden lg:block">
              <h2 className="font-bold text-xl">Conversations</h2>
              <p className="font-bold text-sm text-gray-300">24 ACTIVE CHATS DETECTED</p>
            </div>
            <div className="flex md:hidden">
              <div className="pb-2">
                <div className="flex flex-row">
                  <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </label>
                  <div className="flex items-center px-4">
                    <h2 className="font-semibold text-lg">georgeyinxu</h2>
                    <div className="px-2">
                      <a href="localhost:1111">
                        <img
                          className="w-5"
                          src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <a href="localhost:1111">
                      <img
                        className="w-5"
                        src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/telegram-512.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div className="pl-16 flex flex-row">
                  <div className="avatar">
                    <div className="w-12 rounded-xl">
                      <img src="https://placeimg.com/192/192/people" alt="" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="uppercase text-sm pl-4 font-bold text-blue-500">item name</p>
                    <h6 className="uppercase pl-4 font-bold text-sm">
                      $5940.<span className="text-gray-200">95</span>
                    </h6>
                  </div>
                  <div className="pl-7 items-center">
                    <div className="bg-blue-500 rounded-lg px-2 py-1">
                      <p className="text-white font-bold text-base whitespace-nowrap">
                        In Progress
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pl-16 pt-2">
                  <a href="#offer-modal" className="pr-4 whitespace-nowrap">
                    <button className="btn p-3 btn-info bg-opacity-30 text-xs">MAKE OFFER</button>
                  </a>
                  <button className="btn p-3 btn-error bg-opacity-30 text-xs">REPORT USER</button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="min-[320px]:hidden md-[820px]:block">
              <ChatSidebar
                setSelectedRoom={setSelectedRoom}
                roomsData={filteredData}
                roomID={selectedRoom}
              />
            </div>
            <div className="col-span-2 relative" style={{ maxHeight: '73vh' }}>
              <div>
                <ChatBubbles msg={allMessages} />
              </div>
              <div className="absolute bottom-[-80px] w-full px-4">
                <hr style={{ border: '1px solid #A0A0A0' }} />
                <InputText roomID={selectedRoom} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 md:p-4 relative h-screen col-span-4 md:col-span-3 min-[320px]:hidden md:block">
          <ItemDetails />
        </div>
        <ImageModal roomID={selectedRoom} />
        <FileModal roomID={selectedRoom} />
        <OfferModal roomID={selectedRoom} />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay">
          {' '}
        </label>
        <ul className="menu p-0 w-80 bg-base-100 :flex md:hidden">
          <ChatFilter
            options={options}
            setSelectedFilter={setSelectedFilter}
            retrieveFilteredData={retrieveFilteredData}
            selectedFilter={selectedFilter}
            roomsData={roomsData}
          />
          <ChatSidebar roomsData={filteredData} />
        </ul>
      </div>
    </div>
  );
};

RealTimeChat.allowNonAuthenticated = false;
RealTimeChat.allowAuthenticated = true;
RealTimeChat.getLayout = (page) => <Container>{page}</Container>;

export default RealTimeChat;
