import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/joy/Button";
import { StyledColumn } from "../card/StyledComponents";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Activity.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { listId, listsState, tasksIndex } from "../card/atom";

export default function Activity() {
  const [showDetails, setShowDetails] = useState(false);
  const [watching, setWatching] = useState(false);
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [listsid, setlistsId] = useRecoilState(listId);
  const [taskIndex, setTaskIndex] = useRecoilState(tasksIndex);
  const navigate = useNavigate();
  const [List, setList] = useRecoilState(listsState);

  const handleCloseDialog = () => {
    console.log("Dialog closed");
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToggleWatching = () => {
    setWatching(!watching);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleActivityChange = (value) => {
    setActivity(value);
  };

  const handleShowDescription = () => {
    setShowDescription(true);
  };

  const addDescription = () => {
    const newList = List.map((item) => {
      if (item.id === listsid) {
        const newTaskList = item.tasks.map((obj, index) => {
          if (index === taskIndex) {
            return { ...obj, description: description };
          } else {
            return obj;
          }
        });

        return { ...item, tasks: newTaskList };
      } else {
        return item;
      }
    });
    setList(newList);
    localStorage.setItem("Lists", JSON.stringify(newList));
    setDescription("");
  };

  const addActivity = () => {
    const newActivity = { comment: activity };
    const newList = List.map((item) => {
      if (item.id === listsid) {
        const newTaskList = item.tasks.map((obj, index) => {
          if (index === taskIndex) {
            const updatedActivity = obj.activity ? [...obj.activity, newActivity] : [newActivity];
            return { ...obj, activity: updatedActivity };
          } else {
            return obj;
          }
        });

        return { ...item, tasks: newTaskList };
      } else {
        return item;
      }
    });
    setList(newList);
    localStorage.setItem("Lists", JSON.stringify(newList));
    setActivity("");
    setShowActivity(false);
  };

  const handleAddAnotherComment = () => {
    setShowActivity(true);
  };
  const handleCancelDescription = () => {
    setShowDescription(false);
    setDescription("");
  };

  const handleCancelActivity = () => {
    setShowActivity(false);
    setActivity("");
  };

  const handleShowActive = () => {
    setShowActivity(true);
  };

  const getTask = () => {
    const currentList = List.find((item) => item.id === listsid);
    if (currentList && currentList.tasks && currentList.tasks.length > taskIndex) {
      return currentList.tasks[taskIndex];
    }
    return null;
  };

  const task = getTask();

  if (!task) {
    return null;
  }

  const { description: savedDescription, activity: savedActivity } = task;

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.title}>
          <h2 className={styles.head}>
            <span className={styles.codeZingerIcon}></span>💻 CodeZinger
          </h2>
          <div className={styles.closeButton}>
            <IconButton
              aria-label="close dialog"
              onClick={handleCloseDialog}
              variant="plain"
              color="neutral"
              size="small"
            >
              <CloseIcon onClick={() => navigate("/")} />
            </IconButton>
          </div>
        </div>
        <div className={styles.notificationWatchContainer}>
          <div className={styles.notification}>
            <span className={styles.notificationText}>Notifications</span>
          </div>
          <div className={styles.watchButton}>
            <Button variant="contained" onClick={handleToggleWatching}>
              <VisibilityIcon />
              {watching ? "Watching" : "Watch"}
            </Button>
          </div>
        </div>
        <div className={styles.des}>
          <MenuIcon sx={{ marginRight: "1rem" }} /> <h4>Description</h4>
          <div className={styles.watchButton1}>
            <Button variant="contained" onClick={handleShowDescription}>
              Edit
            </Button>
          </div>
        </div>
        {showDescription ? (
          <div className={styles.descriptionBox}>
            <ReactQuill
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Add a more detailed description..."
            />
            <div className={styles.buttonContainer}>
              <Button onClick={addDescription}>Save</Button>
              <Button
                color="neutral"
                variant="soft"
                onClick={handleCancelDescription}
                sx={{ marginLeft: "0.5rem" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            {savedDescription ? (
              <div
                className={styles.savedText}
                dangerouslySetInnerHTML={{ __html: savedDescription }}
              />
            ) : (
              <input
                className={styles.secondInputBox}
                placeholder="Write a Comment..."
                onClick={handleShowDescription}
              />
            )}
          </>
        )}

        <div className={styles.des}>
          <ReceiptLongIcon sx={{ marginRight: "1rem" }} /> <h4>Activity</h4>
          <div className={styles.watchButton1}>
            <Button variant="contained" onClick={handleToggleDetails}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        </div>
        {showActivity ? (
          <div className={styles.activity}>
            <ReactQuill
              value={activity}
              onChange={handleActivityChange}
              placeholder="Write a Comment..."
            />
            <div className={styles.buttonContainer}>
              <Button onClick={addActivity}>Save</Button>
              <Button
                color="neutral"
                variant="soft"
                onClick={handleCancelActivity}
                sx={{ marginLeft: "0.5rem" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            {savedActivity && savedActivity.length > 0 ? (
              <div className={styles.savedActivity}>
                <Button className={styles.btn} onClick={handleShowActive}>Add Comment</Button>
                {savedActivity.map((comment, index) => (
                  <div
                    key={index}
                    className={styles.savedText}
                    dangerouslySetInnerHTML={{ __html: comment.comment }}
                  />
                ))}
              </div>
            ) : (
              <>
                <input
                  className={styles.secondInputBox}
                  placeholder="Write a Comment..."
                  onClick={handleShowActive}
                />

              </>
            )}
          </>
        )}


      </div>
    </>
  );
}
