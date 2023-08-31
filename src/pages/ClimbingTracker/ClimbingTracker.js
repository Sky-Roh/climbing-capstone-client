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
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const ClimbingTracker = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showModal, setShowModal] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    axios.get(`${SERVER_URL}/climbingsession`).then((res) => {
      const transformedEvents = res.data.map((event) => ({
        id: event.session_id.toString(),
        title: event.description.toString(),
        start: new Date(event.session_date).toISOString().slice(0, 10),
      }));
      //console.log(transformedEvents);
      setCurrentEvents(transformedEvents);
    });
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDateClick = (e) => {
    //use model
    setShowModal(true);

    // const title = prompt("Please enter a new title for your event");

    // const calendarApi = e.view.calendar;
    // calendarApi.unselect();

    // if (title) {
    //   calendarApi.addEvent({
    //     id: `${e.dateStr}-${title}`,
    //     title,
    //     start: e.startStr,
    //     end: e.endStr,
    //     allDay: e.allDay,
    //   });
    // }
  };

  const handleEventClick = (selected) => {

    // get id console.log(selected.event.id)
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
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
          <SessionItem />
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
            select={handleDateClick}
            eventClick={(e) => handleEventClick(e)}
            events={currentEvents}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2023-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>

        <Box
          flex="1 1 25%"
          backgroundColor={colors.primary[400]}
          p="1rem"
          ml="1rem"
          borderRadius="0.25rem"
        >
          <Typography variant="h5">Events</Typography>
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
                
                  primary={`${event.title}, ${event.id}`}
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
