/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/alt-text */

const UserProfileCard = () => (
  <div className="card rounded-lg bg-base-100 shadow-2xl">
    <div className="card-body">
      <h2 className="card-title text-base md:text-base lg:text-lg">georgeyinxu</h2> 
      <hr />
      <h6 className="uppercase text-xs font-bold">about seller</h6>
      <p className="text-sm">bio</p>
      <h6 className="uppercase text-xs font-bold">member since</h6>
      <p className="text-sm">28 July, 2018</p>
      <hr />
      <div className="card-actions justify-end mt-2">
        <a href="https:t.me/+6587494704">
          <img
            src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/telegram-512.png"
            className="w-9"
          ></img>
        </a>
        <a href="https://wa.me/+6587494704">
          <img
            src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png"
            className="w-9"
          ></img>
        </a>
      </div>
    </div>
  </div>
);

export default UserProfileCard;