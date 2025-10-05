import { DatePicker, Space } from "antd";
import { toast } from "react-hot-toast";

const { RangePicker } = DatePicker;

const DatePick = ({ setDatePicked }) => {
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

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={handleDateChange} format="YYYY-MM-DD" />
    </Space>
  );
};

export default DatePick;
