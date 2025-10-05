import { DatePicker, Space } from "antd";
import { toast } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

const { RangePicker } = DatePicker;

const DatePick = ({ setDatePicked }) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [dates, setDates] = useState({
    start: null,
    end: null,
  });

  const handleDateChange = (dates, dateStrings) => {
    if (dates && dates[0] && dates[1]) {
      const diffDays = dates[1].diff(dates[0], "day");

      if (diffDays > 7) {
        toast.error("Date range should not exceed 7 days");
        return;
      }

      setDatePicked({
        start_date: dateStrings[0],
        end_date: dateStrings[1],
      });
    }
  };

  const handleStartChange = (date, dateString) => {
    setDates((prev) => ({ ...prev, start: date }));

    // If end date exists, validate the range
    if (dates.end && date) {
      const diffDays = dates.end.diff(date, "day");

      if (diffDays > 7) {
        toast.error("Date range should not exceed 7 days");
        return;
      }

      if (diffDays < 0) {
        toast.error("Start date must be before end date");
        return;
      }

      setDatePicked({
        start_date: dateString,
        end_date: dates.end.format("YYYY-MM-DD"),
      });
    }
  };

  const handleEndChange = (date, dateString) => {
    setDates((prev) => ({ ...prev, end: date }));

    // If start date exists, validate the range
    if (dates.start && date) {
      const diffDays = date.diff(dates.start, "day");

      if (diffDays > 7) {
        toast.error("Date range should not exceed 7 days");
        return;
      }

      if (diffDays < 0) {
        toast.error("End date must be after start date");
        return;
      }

      setDatePicked({
        start_date: dates.start.format("YYYY-MM-DD"),
        end_date: dateString,
      });
    }
  };

  return (
    <Space direction="vertical" size={12}>
      {!isMobile && (
        <RangePicker onChange={handleDateChange} format="YYYY-MM-DD" />
      )}
      {isMobile && (
        <div className="flex gap-2">
          <DatePicker
            placeholder="Start date"
            onChange={handleStartChange}
            format="YYYY-MM-DD"
            value={dates.start}
          />
          <DatePicker
            placeholder="End date"
            onChange={handleEndChange}
            format="YYYY-MM-DD"
            value={dates.end}
            disabledDate={(current) => dates.start && current < dates.start}
          />
        </div>
      )}
    </Space>
  );
};

export default DatePick;
