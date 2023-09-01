import axios from "axios";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Modal,
} from "@mui/material";
import { tokens } from "../../theme";
import SessionItem from "../../components/SessionItem/SessionItem";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ClimbingTracker = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedID, setSelectedID] = useState(0);
  const [eventTitle, setEventTitle] = useState("");

  useEffect(() => {
    axios.get(`${SERVER_URL}/climbingsession`).then((res) => {
      const transformedEvents = res.data.map((event) => ({
        id: event.session_id,
        title: event.type_name.toString(),
        start: new Date(event.session_date).toISOString().slice(0, 10),
        location: event.location,
        description: event.description,
      }));
      setCurrentEvents(transformedEvents);
    });
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };
  const handleDateClick = (e) => {
    //use model
    setShowModal(true);
    setSelectedDate(e.startStr);
  };

  const handleEventClick = (selected) => {
    if (selected) {
      setShowDelete(true);
    }
    setSelectedID(selected.event.id);
    setEventTitle(selected.event.title);
  };

  return (
    <Box m="20px">
      {/* Modal */}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <SessionItem selectedDate={selectedDate} eventTitle={eventTitle} />
        </>
      </Modal>
      {/* Delete Modal */}
      <Modal
        open={showDelete}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <DeleteModal selectedID={selectedID} />
        </>
      </Modal>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={(e) => handleDateClick(e)}
            eventClick={(e) => handleEventClick(e)}
            events={currentEvents}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          flex="1 1 25%"
          backgroundColor={colors.primary[400]}
          p="1rem"
          ml="1rem"
          borderRadius="0.25rem"
          maxHeight="80vh"
        >
          <Typography color="secondary" variant="h3">Climbing Sessioin</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",

                }}
              >
                <ListItemText
                  primary={`${event.title} : ${event.location}`}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ClimbingTracker;
