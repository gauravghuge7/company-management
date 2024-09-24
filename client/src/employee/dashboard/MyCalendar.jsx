import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Form } from "react-bootstrap";

function MyCalendar() {
  const [events, setEvents] = useState([]); // Store calendar events
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [editMode, setEditMode] = useState(false); // Track whether we are editing an event
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the event being edited
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleDateClick = (info) => {
    if (!editMode) {
      setNewEvent({ ...newEvent, date: info.dateStr });
    }
    setEditMode(false);
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find(
      (event) => event.date === info.event.startStr && event.title === info.event.title
    );
    setSelectedEvent(clickedEvent);
    setNewEvent({
      title: clickedEvent.title,
      date: clickedEvent.date,
      description: clickedEvent.description,
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleEventAdd = () => {
    if (editMode && selectedEvent) {
      const updatedEvents = events.map((event) =>
        event.date === selectedEvent.date && event.title === selectedEvent.title
          ? { ...event, title: newEvent.title, date: newEvent.date, description: newEvent.description }
          : event
      );
      setEvents(updatedEvents);
    } else {
      setEvents([...events, { title: newEvent.title, date: newEvent.date, description: newEvent.description }]);
    }
    setShowModal(false);
    setNewEvent({ title: "", date: "", description: "" });
  };

  const handleEventCancel = () => {
    const filteredEvents = events.filter(
      (event) => !(event.date === selectedEvent.date && event.title === selectedEvent.title)
    );
    setEvents(filteredEvents);
    setShowModal(false);
  };

  return (
    <div>
      <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView={"dayGridMonth"}
    headerToolbar={{
        start: "today prev,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
    }}
    height={"70vh"}
    events={events}
    dateClick={handleDateClick}
    eventClick={handleEventClick}
    style={{ width: '100%' }} // Add this line to set the width to 100%
/>


      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="centered-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Note" : "Add Note"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form>
            <Form.Group className="mb-0">
              <Form.Label>Note Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter note title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
   <br />
            <Form.Group className="mb-0">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter note description"
                rows={3}
                
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <br />
            </Form.Group>

            <Button variant="primary" onClick={handleEventAdd}>
              {editMode ? "Save Changes" : "Add Note"}
            </Button>
            {editMode ? (
              <Button variant="danger" onClick={handleEventCancel} className="ms-2">
                Delete Note
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setEditMode(true)} className="ms-2">
                Edit Note
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MyCalendar;
