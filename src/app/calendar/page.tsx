import { Suspense } from "react";

import { Calendar } from "@/components/calendar";
import { getAllEvents } from "@/lib/api";

export default async function Page() {
  const events = getAllEvents();

  return (
    <div className="container mx-auto px-5">
      <div className="h-screen p-10">
        <Suspense fallback={null}>
          <Calendar events={events} />
        </Suspense>
      </div>
    </div>
  );
}
