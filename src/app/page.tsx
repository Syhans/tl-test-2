import { permanentRedirect } from "next/navigation";

export default async function Index() {
  return permanentRedirect("/calendar");
}
