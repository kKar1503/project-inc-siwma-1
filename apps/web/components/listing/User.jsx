import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

const User = ({ profilePicture, username, company }) => (
  <div className="flex flex-row items-center space-x-2 flex-wrap">
    {profilePicture && (
      <Image
        className="rounded-full object-cover object-center h-10 w-10"
        src={profilePicture}
        width={40}
        height={40}
        alt={`${username}'s_profile_picture`}
      />
    )}
    <div>
      <Link href="/">
        <p className="font-semibold">{username}</p>
      </Link>
      <Link href="/">
        <p className="text-gray-500 text-sm">{company}</p>
      </Link>
    </div>
  </div>
);

User.propTypes = {
  profilePicture: PropTypes.objectOf(Object).isRequired,
  username: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
};

export default User;
