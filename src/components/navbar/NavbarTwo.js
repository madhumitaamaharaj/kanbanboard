import React, { useState } from 'react';
import style from './NavbarTwo.module.css';
import { AiOutlineStar } from 'react-icons/ai';

function NavbarTwo() {
  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className={style.navbar}>
      <div className={style.name}>
        Home Management
        <span className={`${style.icon} ${isStarred ? style.starred : ''}`} onClick={handleStarClick}>
          <AiOutlineStar />
        </span>
      </div>
      <div className={style.button}>
        <img
          className={style.userImage}
          src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
          alt="User"
          width="50px"
          height="50px"
        />
        <button className={style.share}>Share</button>
      </div>
    </div>
  );
}

export default NavbarTwo;