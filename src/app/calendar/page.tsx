import { Calendar } from "@/components/calendar";
import { getAllEvents } from "@/lib/api";

export default async function Page() {
  const events = getAllEvents();

  return (
    <div className="container mx-auto px-5">
      <div className="h-screen p-10">
        <Calendar events={events} />
      </div>
    </div>
  );
}
