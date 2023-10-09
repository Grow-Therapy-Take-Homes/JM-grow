export interface DateObject {
  month: string;
  day: string;
  year: number;
}

export const getDate = (
  timestamp: number | string | Date = Date.now()
): DateObject => {
  const date = new Date(timestamp);

  let month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return { month, day, year };
};

export const getDateString = (
  timestamp: number | string | Date = Date.now()
) => {
  return new Date(timestamp).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
