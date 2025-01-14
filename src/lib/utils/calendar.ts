import { CalendarOptions, ICalendar } from "datebook";
import FileSaver from "file-saver";

export const addToCalendar = (filename: string, body: CalendarOptions) => {
  const calendar = new ICalendar(body);

  const ics = calendar.render();
  const blob = new Blob([ics], {
    type: "text/calendar",
  });

  FileSaver.saveAs(blob, filename);
};
