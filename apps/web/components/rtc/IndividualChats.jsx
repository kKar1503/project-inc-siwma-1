/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/alt-text */
import { BsChatLeftDots } from 'react-icons/bs';
import PropTypes from 'prop-types';

const IndividualChats = ({ room, setSelectedRoom, roomID }) => {
  console.log('Indivudal chat');
  console.log(room);
  console.log(roomID);
  return (
    // ID will be their room id
    <buttton
      role="button"
      onClick={() => setSelectedRoom(roomID)}
      className="flex items-center justify-between py-2 px-3 my-2 rounded-xl hover:cursor-pointer hover:bg-blue-50"
    >
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-12 rounded-xl">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="ml-2">
          <p className="text-2xs font-bold text-gray-400">{room.name}</p>
          <p className="leading-4 text-sm">{room.lastMessage}</p>
        </div>
      </div>
      <div>
        <BsChatLeftDots className="text-blue-500 text-md mr-2" />
      </div>
    </buttton>
  );
};

IndividualChats.propTypes = {
  room: PropTypes.object.isRequired,
  setSelectedRoom: PropTypes.func.isRequired,
  roomID: PropTypes.number.isRequired,
};

export default IndividualChats;