import React,{useState,useRef} from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import {FaTrello}  from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import {  FiChevronDown } from 'react-icons/fi';
import {  AppBar,  Toolbar,  IconButton,  Typography,  TextField,  MenuItem,  Menu,Button} from "@mui/material";
// import {  StarBorderOutlined} from "@mui/icons-material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styles from "./Navbar.module.css";

const StyledIconButton = styled(IconButton)`
  color: white;
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledAppBar = styled(AppBar)`
background-color: rgba(0, 0, 0, 0.616);
  backdrop-filter: blur(10px);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleInput = styled(TextField)`
  ${styles.titleInput}
  
`;

const Navbar = () => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showStarredMenu, setShowStarredMenu] = useState(false);
  const [showRecentMenu, setShowRecentMenu] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] =useState("Todo Management");
  const inputRef = useRef();
  const navigate=useNavigate();
  
  const open = Boolean(anchorEl);

  const toggleStarredMenu = () => {
   setShowStarredMenu(!showStarredMenu);
   };
    
   const toggleRecentMenu = () => {
   setShowRecentMenu(!showRecentMenu);
  };
    

  const toggleWorkspaceMenu = () => {
  setShowWorkspaceMenu(!showWorkspaceMenu);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStarClick = () => {
   setIsStarred(!isStarred);
   };
    

  const handleNameClick = (name) => {
    console.log(name);
    handleClose();
  };

  const handleTitleClick = () => {
    setEditTitle(true);
  };

  const handleTitleBlur = () => {
    setEditTitle(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTitleKeyPress = (event) => {
    if (event.key === "Enter") {
      setEditTitle(false);
      inputRef.current.blur();
    }
  };

  return (
    
    <StyledAppBar    position="static" elevation={0}>
      <StyledToolbar> 
        <StyledIconButton edge="start" color="inherit" aria-label="menu">
        < FaTrello className={styles.logo} />   
        <div className={styles.logoText}>Trello</div>
        </StyledIconButton>

        <div className={`${styles.icon} ${isStarred ? styles.starred : ''}`} onClick={handleStarClick}>
          <AiOutlineStar />
       </div>      
        
        {editTitle ? (
          <TitleInput
            inputRef={inputRef}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            autoFocus
          />
        ) : (
          <Typography variant="h6" onClick={handleTitleClick}>
            {title}
          </Typography>
        )}
        <StyledIconButton>
        <div className={styles.menuContainer}>
         <div className={styles.dropdown}>
           <button className={`${styles.menuButton} ${styles.dropdownButton}`} onClick={toggleWorkspaceMenu}>
             Workspaces <FiChevronDown className={styles.arrowIcon} />
          </button>
           {showWorkspaceMenu && (
            <div className={styles.dropdownContent}>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
            </div>
          )}
        </div>
       
        <div className={styles.dropdown}>
          <button className={`${styles.menuButton} ${styles.dropdownButton}`} onClick={toggleStarredMenu}>
            Starred <FiChevronDown className={styles.arrowIcon} />
          </button>
          {showStarredMenu && (
            <div className={styles.dropdownContent}>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
              <a href="#">Trello</a>
            </div>
          )}
        </div>
        
        <div className={styles.dropdown}>
          <button className={`${styles.menuButton} ${styles.dropdownButton}`} onClick={toggleRecentMenu}>
            Recent <FiChevronDown className={styles.arrowIcon} />
          </button>
          {showRecentMenu && (
            <div className={styles.dropdownContent}>
              <a href="#">Trello </a>
              <a href="#">Trello </a>
              <a href="#">Trello </a>
            </div>
          )}
        </div>
       </div> 
        </StyledIconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleNameClick(" Darshan Shinde")}>
            Darshan Shinde
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Naga Sai Lakshmi")}>
          Naga Sai Lakshmi
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Madhumita Chaudhuri")}>
            Madhumita Chaudhuri
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Himanshu Yadav")}>
            Himanshu Yadav
          </MenuItem>
        </Menu>
        <Button 
               //onClick={handleImage}
               onClick={()=>{navigate('/template')}} 
              variant='contained' 
              id={styles.whiteBtn} 
              startIcon={<AddPhotoAlternateIcon />}> Change Background</Button>


        

        <StyledIconButton color="inherit" onClick={handleProfileClick}>
          
          <img
       className={styles.userImage}

       src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"

            alt="User"

            width="50px"

           height="50px" 
            />
       </StyledIconButton>
       
      </StyledToolbar>
    </StyledAppBar>
  
   
  );
};

export default Navbar;
