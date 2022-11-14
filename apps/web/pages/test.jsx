import { useState } from 'react';
import { HamburgerMenu } from '@inc/ui';

const Test = () => {
  // ------------------ Use States ------------------
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* <HamburgerMenuOld */}
      {/*  navigationTabs={{ */}
      {/*    tab1: '#', */}
      {/*    tab2: '#2', */}
      {/*    tab3: '#2', */}
      {/*    tab4: '#2', */}
      {/*  }} */}
      {/* /> */}
      <HamburgerMenu open={open} setOpen={setOpen} />
      {/* Other content to test the hamburger menu */}
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus adipisci vero fugit voluptas,
      blanditiis beatae amet ratione reprehenderit ad repellendus! Fuga velit id ad? Architecto
      suscipit consequuntur aliquam velit inventore.
    </>
  );
};

export default Test;
