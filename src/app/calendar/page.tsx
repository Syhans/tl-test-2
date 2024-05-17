import { Suspense } from "react";

import { Calendar } from "@/components/calendar";
import { getAllEvents } from "@/lib/api";

export default async function Page() {
  const events = getAllEvents();

  return (
    <div className="mx-auto h-[calc(100svh-64px)] max-w-[90rem]">
      <Suspense fallback={null}>
        <Calendar events={events} />
      </Suspense>
    </div>
  );
}
