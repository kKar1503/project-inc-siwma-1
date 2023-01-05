import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * A component that displays a small user profile with just
 * the profile picture and the username
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const User = ({ profilePicture, username }) => (
  <div className="flex flex-row items-center space-x-2">
    <Image
      className="rounded-full object-cover object-center h-10 w-10"
      src={profilePicture}
      alt={`${username}'s_profile_picture`}
    />
    <Link href={`/user/${username}`}>@{username}</Link>
  </div>
);

const propTypes = {
  profilePicture: PropTypes.objectOf(Object).isRequired,
  username: PropTypes.string.isRequired,
};

User.propTypes = propTypes;

export default User;
