import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'

class DeleteWarning extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div className="DeleteWarning">
        <Modal show={this.props.displayDeleteWarning} onHide={this.props.closeDeleteModal}>
          <Modal.Header closeButton={this.props.closeDeleteModal}>
            <Modal.Title>Heads up! You're deleting a base!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete <span className='bold-text'>{this.props.baseToDelete.baseName}</span>?</p>
            <br />
            <p>This cannot be undone. But you knew that already.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeDeleteModal}>
              Close
            </Button>
            <Button variant="danger" onClick={this.props.confirmedDelete}>
              Delete It
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteWarning;