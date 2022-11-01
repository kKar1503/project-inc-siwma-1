import Head from 'next/head';
import { BsThreeDotsVertical } from 'react-icons/Bs'

const chatHeader = () => {
  return (
    <div>
    <main>
        <div style={{width: 700, position: 'relative', zIndex: 1}} className="navbar bg-base-100 rounded-t-md w-14 border">
          <div className='flex-1'>
            <div className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </div>
            <div style={{flexDirection: 'column', paddingLeft: 5}}>
              <div className='font-bold'>
                <a href="/">Name (Company)</a>
              </div>
              <div style={{fontSize: 12}}>
                Last seen 10 minutes ago
              </div>
            </div>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end" style={{position: 'relative', display: 'inline-block'}}> 
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-67 rounded-full">
                    <BsThreeDotsVertical />
                </div>
              </label>
              <ul tabIndex={0} style={{position: 'absolute'}} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a>Archive Chat</a></li>
                <li><a>Block User</a></li>
                <li><a>Delete Chat</a></li>
                <li><a>Report User</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{width: 700, position: 'relative', display: 'block'}} className="navbar bg-base-100 rounded-b-md w-14 border">
            <div className='flex-1'>
                <div className="btn btn-circle btn-ghost avatar">
                <div className="w-10 rounded-md">
                    <img src="https://placeimg.com/80/80/people" />
                </div>
                    <div style={{position: 'absolute', backgroundColor: 'white', height: 10, width: 40, paddingBottom: 13, marginTop: 25}}>
                        <div style={{position: 'absolute', fontSize: 7, paddingLeft: 4}}>Reserved</div>
                    </div>
                </div>
                <div style={{flexDirection: 'column', paddingLeft: 5}}>
                <div>
                    <a href="/">
                        Mild Steel Channel Hot Rolled (Bar 0.750 x 0.375 x 0.125)
                    </a>
                </div>
                <div className='font-bold'>
                    Price
                </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default chatHeader;
