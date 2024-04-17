"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

type Event = {
  id: string;
  title?: string;
  start: string;
  end?: string;
  display?: string;
};

const events: Event[] = [
  { title: "event 1", start: "2014-10-02", id: "1", end: "2014-10-04" },
  { title: "event 2", start: "2014-10-03", id: "2" },
  { start: "2014-10-03", display: "background", id: "3" },
];

function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate={"2014-10-01"}
      events={events}
      validRange={{
        start: "2014-10-01",
        end: "2015-12-31",
      }}
      height={"100%"}
      headerToolbar={{
        left: "title",
        center: "",
        right: "prev,next",
      }}
      eventClick={(info) => {
        console.log(info.event.id);
      }}
      eventClassNames="cursor-pointer"
    />
  );
}

export { Calendar };
