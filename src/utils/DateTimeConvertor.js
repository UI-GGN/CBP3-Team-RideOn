import moment from "moment";

export const getDateTime = (timestamp) => {
  return moment(timestamp).format("ddd DD MMM YYYY h:mm A");
};
