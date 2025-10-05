import { useState } from "react";
import DatePick from "../ui/DatePick";
import HeatmapPlot from "./HeatMapPlot";
import PearsonsCorrelation from "../ui/PearsonsCorrelation";
import AsteroidCountWeekly from "./AsteroidCountWeekly";

const HeatMapContainer = () => {
  const [datePicked, setDatePicked] = useState({
    start_date: "2025-09-28",
    end_date: "2025-10-04",
  });

  return (
    <div className="bg-black text-white pt-20 px-10 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between ">
      <div className="flex flex-col">
        <DatePick setDatePicked={setDatePicked} />
        <div className="mt-5">
          <PearsonsCorrelation datePicked={datePicked} />
        </div>
        <div className="pr-2 py-4">
          <AsteroidCountWeekly datePicked={datePicked} />
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <HeatmapPlot datePicked={datePicked} setDatePicked={setDatePicked} />
      </div>
    </div>
  );
};

export default HeatMapContainer;
