import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import Comment from "./Comment";
import styles from "./CommentsList.module.css";
import Picker from '@emoji-mart/react'
import * as commentService from "../../services/comentService";

const CommentsList = ({ entityId, type }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    commentService
      .getAllForEntity(entityId)
      .then((result) => {
        if (result.error) throw new Error(result.error);

        setComments(result);
      })
      .catch((error) => {
        console.log(error);
        navigate(`/error`);
      });
  }, [entityId]);

  const handleEmojiSelect = (emoji) => {
    setNewComment((prevComment) => prevComment + emoji.native);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

	const currentDate = new Date();

    const createdComment = await commentService.create(
      type,
      entityId,
      "1",
      "username 1",
      newComment,
      currentDate,
      currentDate
    );

    setComments((state) => [...state, createdComment]);
    setNewComment("");
  };

  const deleteCommentHandler = async (_id) => {	    
	await commentService.remove(_id);

    setComments(state => state.filter(comment => { return comment._id !== _id}));
  }

  const editCommentHandler = async (_id, text) => {	    
	const currentDate = new Date();

	await commentService.update(_id, text, currentDate);
  }

  return (
    <div className={styles["comments-section"]}>
      <h1 className={styles["comments-title"]}>All Comments</h1>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} onDelete={deleteCommentHandler} onEdit={editCommentHandler}/>
      ))}
      <div className={styles["create-comment"]}>
        <label>Add new comment:</label>

		<button onClick={() => setShowPicker(!showPicker)}>😊</button>
		{showPicker && <Picker onEmojiSelect={handleEmojiSelect} />}
        <form className={styles['form']} onSubmit={addCommentHandler}>
          <InputTextarea
            rows={5}
            cols={100}
            autoResize
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Comment......"
          />
		  <br></br>
          <button
            type="submit"
            className="pi pi-send p-button p-button-raised p-button-success"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsList;
