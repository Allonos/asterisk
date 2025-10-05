import { useQuery } from "@tanstack/react-query";
import Plot from "react-plotly.js";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const AsteroidCountWeekly = () => {
  const isLargeScreen = useMediaQuery({ maxWidth: 1440 });
  const [dateRange] = useState({
    startOfMonth: new Date(2025, 7, 1), // August 1, 2025
    endOfMonth: new Date(2025, 9, 1), // October 1, 2025
  });

  const fetchWeeklyAsteroids = async () => {
    const apiUrl = "https://api.nasa.gov/neo/rest/v1/feed";
    const apiKey =
      import.meta.env.VITE_API_KEY ||
      "6NXaopMA1vdtUfwzUPXA1JVvWChSnWvI57oBkanI";

    const { startOfMonth, endOfMonth } = dateRange;
    let currentStart = new Date(startOfMonth);
    const weeklyData = [];

    while (currentStart <= endOfMonth) {
      const currentEnd = new Date(currentStart);
      currentEnd.setDate(currentEnd.getDate() + 6);

      const startDate = currentStart.toISOString().split("T")[0];
      const endDate = currentEnd.toISOString().split("T")[0];

      const url = `${apiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      const count = parseInt(data.element_count);

      weeklyData.push({
        startDate: startDate,
        endDate: endDate,
        count: count,
      });

      currentStart = new Date(currentEnd);
      currentStart.setDate(currentStart.getDate() + 1);
    }

    return weeklyData;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "asteroids-weekly",
      dateRange.startOfMonth,
      dateRange.endOfMonth,
    ],
    queryFn: fetchWeeklyAsteroids,
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading asteroid data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  const weeks = data?.map((d) => d.startDate) || [];
  const counts = data?.map((d) => d.count) || [];
  const maxCount = Math.max(...counts);

  const startFormatted = formatDate(
    dateRange.startOfMonth.toISOString().split("T")[0]
  );
  const endFormatted = formatDate(
    dateRange.endOfMonth.toISOString().split("T")[0]
  );

  return (
    <div className="w-full max-w-[600px] p-4 mb-[30px]">
      <Plot
        data={[
          {
            x: weeks,
            y: counts,
            type: "scatter",
            mode: "lines+markers",
            marker: {
              color: "blue",
              size: isLargeScreen ? 8 : 10,
              line: {
                color: "blue",
                width: 2,
              },
            },
            line: {
              color: "black",
              width: 2,
            },
          },
        ]}
        layout={{
          title: {
            text: `Asteroid count by week (${startFormatted} - ${endFormatted})`,
            font: { size: isLargeScreen ? 13 : 20, color: "black" },
          },
          xaxis: {
            title: "Week Start Date",
            showgrid: true,
            color: "black",
            gridcolor: "#333",
            titlefont: { size: isLargeScreen ? 12 : 14 },
            tickfont: { size: isLargeScreen ? 10 : 12 },
          },
          yaxis: {
            title: "Number of Asteroids",
            range: [0, maxCount * 1.1],
            showgrid: true,
            color: "black",
            gridcolor: "#333",
            titlefont: { size: isLargeScreen ? 12 : 14 },
            tickfont: { size: isLargeScreen ? 10 : 12 },
          },
          paper_bgcolor: "white",
          plot_bgcolor: "white",
          font: {
            color: "white",
          },
          autosize: true,
          margin: {
            t: 80,
            b: isLargeScreen ? 60 : 80,
            l: isLargeScreen ? 60 : 80,
            r: isLargeScreen ? 30 : 40,
          },
        }}
        style={{
          width: "100%",
          height: "500px",
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default AsteroidCountWeekly;
