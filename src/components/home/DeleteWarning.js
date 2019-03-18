import React from 'react';
import { Button, Modal } from 'react-bootstrap'

const DeleteWarning = (props) => {
  return (
    <div className="DeleteWarning">
      <Modal show={props.displayDeleteWarning} onHide={props.closeDeleteModal}>
        <Modal.Header closeButton={props.closeDeleteModal}>
          <Modal.Title>Heads up! You're deleting a base!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <span className='bold-text'>{props.baseToDelete.baseName}</span>?</p>
          <br />
          <p>This cannot be undone. But you knew that already.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeDeleteModal}>
            Close
            </Button>
          <Button variant="danger" onClick={props.confirmedDelete}>
            Delete It
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteWarning;