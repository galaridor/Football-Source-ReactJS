import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import EditCommentModal from './EditCommentModal';
import { formatUTCDateToLocal } from '../../utils/dateTimeUtils';
import styles from './Comment.module.css';
import { useState } from 'react';

const Comment = ({ _id, username, text, dateCreated, lastModifiedOn, onDelete, onEdit }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editComment, setEditComment] = useState({});

    const editCommentHandler = async (e) => {
        e.preventDefault();
        
        openEditModal();
        setEditModalOpen(true);
      };

      const deleteCommentHandler = async (e) => {
        e.preventDefault();

        await onDelete(_id);
      };

      const openEditModal = (comment) => {
        setEditComment(comment);
        setEditModalOpen(true);
      };
    
      const closeEditModal = () => {
        setEditComment({});
        setEditModalOpen(false);
      };
    
      const saveEditedComment = async () => {
        //ToDo

         closeEditModal();
      };

  const cardFooter = (
    <span>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" onClick={editCommentHandler}/>
      <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" onClick={deleteCommentHandler}/>
    </span>
  );

  return (
    <div className={styles['comment-section']}>
      <Card className={[styles['comment-card']]} title={`User: ${username} (${_id})`} subTitle={`Created On: ${formatUTCDateToLocal(dateCreated)}`} footer={cardFooter}>
        <p>{text}</p>
        <small>Last Modified On: {formatUTCDateToLocal(lastModifiedOn)}</small>
      </Card>
      <EditCommentModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={saveEditedComment}
        comment={text}
      />
    </div>
  );
};

export default Comment;