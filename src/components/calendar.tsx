"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Event } from "@/interfaces";

function Calendar({ events }: { events: Event[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <FullCalendar
      timeZone="Japan"
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate={searchParams.get("initialDate") ?? "2014-10-01"}
      events={events}
      validRange={{
        start: "2014-10-01",
        end: "2015-12-31",
      }}
      height={"100%"}
      displayEventTime={false}
      headerToolbar={{
        left: "title",
        center: "",
        right: "prev,next",
      }}
      eventClick={(info) => {
        const eventId = info.event.id;
        if (eventId.startsWith("episode-")) {
          router.push(`/episodes/${eventId.replace("episode-", "")}`);
        } else {
          router.push(`/calendar/${eventId}`);
        }
      }}
      eventClassNames="cursor-pointer"
    />
  );
}

export { Calendar };
