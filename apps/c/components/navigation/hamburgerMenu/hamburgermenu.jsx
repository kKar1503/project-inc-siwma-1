import {useState} from "react";
import "./HamburgerMenuStyles.module.css"

export default function HamburgerMenu({navigationTabs}) {
  const [open, setOpen] = useState(false);
  const content = Object.keys(navigationTabs).map(key => {
    const value = navigationTabs[key];
    return (
      <li style={{margin: "5px"}}>
        <a href={value} key={key}>
          <div style={{backgroundColor: "gray"}} className={"hamburger-menu-element"}>
            {key}
          </div>
        </a>
      </li>
    )
  });
  const hamburgerContent = (
    <div style={{position: "absolute", backgroundColor: "red", width: "12em"}}>
      <ul style={{listStyle: "none"}}>
        {content}
      </ul>
    </div>
  )
  return (
    <div>
      <button className={"btn"} onClick={() => {
        setOpen(!open)
      }}>
        Hamburger
      </button>

      {open && hamburgerContent}
    </div>
  )
}
