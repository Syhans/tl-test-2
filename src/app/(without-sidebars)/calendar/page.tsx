import { Calendar } from "@/components/calendar";
import { getAllEvents } from "@/lib/api";

export default function Page() {
  const events = getAllEvents();

  return (
    <div className="mx-auto h-[calc(100svh-64px)] max-w-[90rem]">
      <Calendar events={events} />
    </div>
  );
}
