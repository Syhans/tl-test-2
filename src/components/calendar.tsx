"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { Event } from "@/interfaces";
import { convertDateMonth } from "@/lib/date";

const validRange = {
  start: "2014-10-01",
  end: "2016-01-01",
};

function Calendar({ events }: { events: Event[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const calendarRef = useRef<FullCalendar>(null);

  const [currentDate, setCurrentDate] = useState<string>(
    searchParams.get("date") ?? "2014-10-01",
  );
  const initialDateRef = useRef<string>(currentDate);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState<boolean>(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false);

  const searchParamsRef = useRef<URLSearchParams>(searchParams);
  useEffect(() => {
    const date = searchParamsRef.current.get("date") ?? initialDateRef.current;
    calendarRef.current?.getApi().gotoDate(date);
  }, []);

  const pathnameRef = useRef<string>(pathname);
  const routerRef = useRef<typeof router>(router);
  useEffect(() => {
    // update button states
    setPrevButtonDisabled(currentDate <= validRange.start);
    const nextDate = new Date(currentDate);
    nextDate.setMonth(nextDate.getMonth() + 1);
    setNextButtonDisabled(
      nextDate.toISOString().slice(0, 10) >= validRange.end,
    );
  }, [currentDate]);
  useEffect(() => {
    const searchParamsDate = searchParams.get("date");
    if (
      searchParamsDate &&
      searchParamsDate.slice(0, 7) === currentDate.slice(0, 7)
    ) {
      return;
    }
    // update URL
    routerRef.current.replace(`${pathnameRef.current}?date=${currentDate}`);
  }, [currentDate, searchParams]);

  const onPrev = () => {
    calendarRef.current?.getApi().prev();
  };
  const onNext = () => {
    calendarRef.current?.getApi().next();
  };

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-end space-x-1">
        <H1 className="grow">{convertDateMonth(currentDate)}</H1>
        <Button
          onClick={onPrev}
          variant="outline"
          disabled={prevButtonDisabled}
          aria-label="Previous month"
        >
          <ChevronUp className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          onClick={onNext}
          variant="outline"
          disabled={nextButtonDisabled}
          aria-label="Next month"
        >
          <ChevronDown className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <div className="flex-1">
        <FullCalendar
          ref={calendarRef}
          timeZone="Japan"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          validRange={validRange}
          height="100%"
          displayEventTime={false}
          headerToolbar={false}
          eventClick={(info) => {
            const eventId = info.event.id;
            if (eventId.startsWith("episode-")) {
              router.push(`/episodes/${eventId.replace("episode-", "")}`);
            } else {
              router.push(`/calendar/${eventId}`);
            }
          }}
          datesSet={(info) => {
            setCurrentDate(info.view.currentStart.toISOString().slice(0, 10));
          }}
          eventClassNames="cursor-pointer"
        />
      </div>
    </div>
  );
}

export { Calendar };
