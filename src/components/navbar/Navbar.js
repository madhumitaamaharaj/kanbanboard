import React, { useState } from 'react';
import style from './Navbar.module.css';
import { BsGrid3X3GapFill, BsSearch, BsFillBellFill, BsFillPersonFill, BsInfoCircleFill, BsQuestionSquareFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FiPlus, FiChevronDown } from 'react-icons/fi';

function Navbar() {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showStarredMenu, setShowStarredMenu] = useState(false);
  const [showRecentMenu, setShowRecentMenu] = useState(false);

  const toggleWorkspaceMenu = () => {
    setShowWorkspaceMenu(!showWorkspaceMenu);
  };

  const toggleStarredMenu = () => {
    setShowStarredMenu(!showStarredMenu);
  };

  const toggleRecentMenu = () => {
    setShowRecentMenu(!showRecentMenu);
  };

  return (
    <div className={style.navbar}>
      <div className={style.logoContainer}>
        <BsGrid3X3GapFill className={style.logo} />
        <span className={style.logoText}></span>
      </div>
      
      <div className={style.menuContainer}>
        <div className={style.dropdown}>
          <button className={`${style.menuButton} ${style.dropdownButton}`} onClick={toggleWorkspaceMenu}>
            Workspaces <FiChevronDown className={style.arrowIcon} />
          </button>
          {showWorkspaceMenu && (
            <div className={style.dropdownContent}>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
            </div>
          )}
        </div>
        <div className={style.dropdown}>
          <button className={`${style.menuButton} ${style.dropdownButton}`} onClick={toggleStarredMenu}>
            Starred <FiChevronDown className={style.arrowIcon} />
          </button>
          {showStarredMenu && (
            <div className={style.dropdownContent}>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
            </div>
          )}
        </div>
        <div className={style.dropdown}>
          <button className={`${style.menuButton} ${style.dropdownButton}`} onClick={toggleRecentMenu}>
            Recent <FiChevronDown className={style.arrowIcon} />
          </button>
          {showRecentMenu && (
            <div className={style.dropdownContent}>
              <a href="#">Trello </a>
              <a href="#">Trello </a>
              <a href="#">Trello </a>
            </div>
          )}
        </div>
      </div>
      <div className={style.searchContainer}>
        <input type="text" className={style.searchInput} placeholder="Search" />
        <BsSearch className={style.searchIcon} />
      </div>
      <div className={style.buttonContainer}>
        <button className={style.iconButton}>
          <BsFillBellFill className={style.icon} />
        </button>
        <button className={style.iconButton}>
          <BsInfoCircleFill className={style.icon} />
        </button>
        <button className={style.iconButton}>
          <BsFillPersonFill className={style.icon} />
        </button>
        <button className={style.iconButton}>
          <BsQuestionSquareFill className={style.icon} />
        </button>
        <button className={style.iconButton}>
          <BsThreeDotsVertical className={style.icon} />
        </button>
        <button className={style.addButton}>
          <FiPlus className={style.addIcon} />
          <span className={style.addText}>Add</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;