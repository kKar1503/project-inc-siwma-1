/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import IndividualChats from './IndividualChats';

const ChatSidebar = ({ roomsData }) => (
  <div
    className="bg-slate-200 py-3 px-1 rounded-r-3xl overflow-y-scroll"
    style={{ height: '85vh' }}
  >
    {roomsData.map((room) => (
      <IndividualChats room={room} />
    ))}
  </div>
);

ChatSidebar.propTypes = {
  roomsData: PropTypes.arrayOf(PropTypes.object),
};

export default ChatSidebar;
