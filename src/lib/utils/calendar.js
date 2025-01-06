import { ICalendar } from "datebook";

export const addToCalendar = (filename, body) => {
  new ICalendar(body).download(filename);
};
