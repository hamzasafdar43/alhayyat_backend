// utils/dateFilters.js
function getDateRange(filter) {
  const now = new Date();
  let start, end;

  if (filter === "day") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  } 
  else if (filter === "month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  } 
  else if (filter === "year") {
    start = new Date(now.getFullYear(), 0, 1);
    end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  } 
  else {
    throw new Error("Invalid filter. Use 'day', 'month', or 'year'.");
  }

  return { start, end };
}

module.exports = { getDateRange };
