import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Plot from "react-plotly.js";
import dayjs from "dayjs";
import Loader from "../ui/Loader";

const HeatmapPlot = ({ datePicked }) => {
  const fetchAsteroids = async ({ start_date, end_date }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await axios.get(apiUrl, {
      params: {
        start_date,
        end_date,
        api_key: apiKey,
      },
    });

    return response.data;
  };

  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["asteroids", datePicked.start_date, datePicked.end_date],
    queryFn: () => fetchAsteroids(datePicked),
  });

  // Process the asteroid data
  const processAsteroidData = (data) => {
    if (!data?.near_earth_objects) return null;

    const ids = [],
      names = [],
      magn = [],
      diam = [],
      velo = [],
      miss = [],
      dates = [];

    const arr = data.near_earth_objects;

    for (const [k, V] of Object.entries(arr)) {
      for (const v of V) {
        ids.push(v.id);
        names.push(v.name);
        magn.push(parseFloat(v.absolute_magnitude_h));
        diam.push(
          parseFloat(v.estimated_diameter.kilometers.estimated_diameter_max)
        );
        velo.push(
          parseFloat(
            v.close_approach_data[0].relative_velocity.kilometers_per_second
          )
        );
        miss.push(
          parseFloat(v.close_approach_data[0].miss_distance.kilometers)
        );
        dates.push(k);
      }
    }

    return { ids, names, magn, diam, velo, miss, dates };
  };

  // Calculate Pearson correlation coefficient
  const pearsonCorrelation = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    );

    return denominator === 0 ? 0 : numerator / denominator;
  };

  // Create correlation matrix
  const createCorrelationMatrix = (asteroidData) => {
    if (!asteroidData) return null;

    const numeric = {
      "Absolute Magnitude (H)": asteroidData.magn,
      "MAX Estimated Diameter (km)": asteroidData.diam,
      "Miss Distance (km)": asteroidData.miss,
      "Relative Velocity (km/s)": asteroidData.velo,
    };

    const labels = Object.keys(numeric);
    const n = labels.length;
    const corrMatrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        corrMatrix[i][j] = pearsonCorrelation(
          numeric[labels[i]],
          numeric[labels[j]]
        );
      }
    }

    return { corrMatrix, labels };
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error?.message}</div>;

  const asteroidData = apiData ? processAsteroidData(apiData) : null;
  if (!asteroidData) return <div>No asteroid data available</div>;

  const { corrMatrix, labels } = createCorrelationMatrix(asteroidData);

  // Create annotations for correlation values
  const annotations = [];
  for (let i = 0; i < corrMatrix.length; i++) {
    for (let j = 0; j < corrMatrix[i].length; j++) {
      annotations.push({
        x: j,
        y: i,
        text: corrMatrix[i][j].toFixed(3),
        showarrow: false,
        font: {
          color: Math.abs(corrMatrix[i][j]) > 0.5 ? "white" : "black",
          size: 12,
          weight: "bold",
        },
      });
    }
  }

  const heatMapTitle = `Correlation Heatmap of Asteroid Features (${dayjs(
    datePicked.start_date
  )
    .format("D MMM YYYY")
    .toLowerCase()} - ${dayjs(datePicked.end_date)
    .format("D MMM YYYY")
    .toLowerCase()})`;

  return (
    <div>
      <Plot
        data={[
          {
            z: corrMatrix,
            x: labels,
            y: labels,
            type: "heatmap",
            colorscale: [
              [0, "#3B4CC0"],
              [0.5, "#F7F7F7"],
              [1, "#B40426"],
            ],
            zmid: 0,
            showscale: true,
            colorbar: {
              title: "Correlation",
              tickfont: { color: "white" },
              titlefont: { color: "white" },
            },
          },
        ]}
        layout={{
          title: {
            text: heatMapTitle,
            font: { color: "white" },
          },
          xaxis: {
            tickangle: -45,
            side: "bottom",
            tickfont: { color: "white" },
            titlefont: { color: "white" },
            gridcolor: "#444",
          },
          yaxis: {
            autorange: "reversed",
            tickfont: { color: "white" },
            titlefont: { color: "white" },
            gridcolor: "#444",
          },
          annotations: annotations,
          width: 800,
          height: 700,
          margin: { l: 200, r: 50, t: 100, b: 150 },
          paper_bgcolor: "black",
          plot_bgcolor: "black",
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default HeatmapPlot;
