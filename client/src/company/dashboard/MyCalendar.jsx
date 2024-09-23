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
    setNewEvent({ ...newEvent, date: info.dateStr });
    setEditMode(false); // Make sure we're not in edit mode
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find(
      (event) =>
        event.date === info.event.startStr && event.title === info.event.title
    );
    setSelectedEvent(clickedEvent);
    setNewEvent({
      title: clickedEvent.title,
      date: clickedEvent.date,
      description: clickedEvent.description,
    });
    setEditMode(true); // Switch to edit mode
    setShowModal(true);
  };

  const handleEventAdd = () => {
    if (editMode && selectedEvent) {
      const updatedEvents = events.map((event) =>
        event.date === selectedEvent.date && event.title === selectedEvent.title
          ? {
              ...event,
              title: newEvent.title,
              description: newEvent.description,
            }
          : event
      );
      setEvents(updatedEvents);
    } else {
      setEvents([
        ...events,
        {
          title: newEvent.title,
          date: newEvent.date,
          description: newEvent.description,
        },
      ]);
    }
    setShowModal(false);
    setNewEvent({ title: "", date: "", description: "" });
  };

  const handleEventCancel = () => {
    const filteredEvents = events.filter(
      (event) =>
        !(
          event.date === selectedEvent.date &&
          event.title === selectedEvent.title
        )
    );
    setEvents(filteredEvents);
    setShowModal(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // Navigation buttons
          center: "title", // Title in the center
          end: "dayGridMonth,timeGridWeek,timeGridDay", // View switching buttons
        }}
        height={"90vh"}
        events={events} // Render the events array
        dateClick={handleDateClick} // Handle date clicks to add events
        eventClick={handleEventClick} // Handle event clicks to edit/delete events
      />

      {/* Modal for adding/editing an event */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="modal-sm" // Bootstrap class for smaller modals
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Event/Note" : "Add Event/Note"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Add Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add Notes"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </Form.Group>

            <Button variant="primary" onClick={handleEventAdd}>
              {editMode ? "Save Changes" : "Save Notes"}
            </Button>
            {editMode && (
              <Button
                variant="danger"
                onClick={handleEventCancel}
                className="ms-2"
              >
                Delete Notes
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MyCalendar;