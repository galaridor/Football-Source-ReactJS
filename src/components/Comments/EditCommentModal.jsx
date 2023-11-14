import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Modal from 'react-modal';

const EditCommentModal = ({ isOpen, onClose, onSave, comment, onEdit }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Edit Comment</h2>
      <InputTextarea
        rows={4}
        cols={30}
        autoResize
        value={comment}
        onChange={onEdit}
      />
      <Button label="Save" className="p-button-raised p-button-success" onClick={onSave} />
      <Button label="Cancel" className="p-button-raised p-button-secondary" onClick={onClose} />
    </Modal>
  );
};

export default EditCommentModal;
