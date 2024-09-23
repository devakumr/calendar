import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const EventModal = ({ isOpen, onClose, onSave, selectedDate, eventToEdit,onDelete }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    debugger
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [eventToEdit]);

  if (!isOpen) return null;

  const handleSave = () => {
    debugger
    onSave({ title, description, date: selectedDate, id: eventToEdit ? eventToEdit.id : null });
    setTitle("");
    setDescription("");
    onClose();
  };

  const handleDelete = () => {
    debugger
    if (eventToEdit) {
        onDelete(eventToEdit.id, selectedDate); // Call the delete function passed from the parent
    }
    onClose();
};



  return (
    <div className="modal show" style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ width: '500px' }}>
          <div className="modal-header" style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
            <h5 className="modal-title">Add Event</h5>
            <button style={{ border: 'none' }} type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              {eventToEdit ? "Update" : "Save"}
            </button>
            {eventToEdit && (
              <button type="button" className="btn btn-primary" onClick={handleDelete}>
               delete
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
