import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

const User = ({ profilePicture, username }) => (
  <div className="flex flex-row items-center space-x-2 flex-wrap">
    <Image
      className="rounded-full object-cover object-center h-10 w-10"
      src={profilePicture}
      alt={`${username}'s_profile_picture`}
    />
    <Link href={`/user/${username}`}>@{username}</Link>
  </div>
);

User.propTypes = {
  profilePicture: PropTypes.objectOf(Object).isRequired,
  username: PropTypes.string.isRequired,
};

export default User;
