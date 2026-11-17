import { election } from "@/data/election";

/** Calendar invite for election day (all-day event, Africa/Nairobi). */
export function GET() {
  const day = election.date.replaceAll("-", "");
  const next = String(Number(day) + 1);
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kosgei 2027//Mara ya Tatu//EN",
    "BEGIN:VEVENT",
    `UID:general-election-${day}@kosgei2027`,
    "DTSTAMP:20261117T000000Z",
    `DTSTART;VALUE=DATE:${day}`,
    `DTEND;VALUE=DATE:${next}`,
    "SUMMARY:Kenya General Election · Vote Kipkelion West",
    "DESCRIPTION:Polls open 6am. Mara ya Tatu.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="election-2027.ics"' },
  });
}
