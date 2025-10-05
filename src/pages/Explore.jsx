import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DatePick from "../components/ui/DatePick";
import Loader from "../components/ui/Loader";

const Explore = () => {
  const [datePicked, setDatePicked] = useState({
    start_date: "2025-09-28",
    end_date: "2025-09-29",
  });

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

    const allAsteroids = Object.values(response.data.near_earth_objects).flat();
    return allAsteroids;
  };

  const {
    data: asteroids = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["asteroids", datePicked.start_date, datePicked.end_date],
    queryFn: () => fetchAsteroids(datePicked),
  });

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Near-Earth Asteroid Tracker
        </h1>

        <div className="mb-8">
          <h3 className="text-white mb-2">Choose a date range</h3>
          <DatePick setDatePicked={setDatePicked} />
        </div>

        {isLoading && <Loader />}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-bold text-lg mb-2">Error Loading Data</h3>
            <p>
              {error?.message ||
                "Failed to fetch asteroid data. Please try again."}
            </p>
          </div>
        )}

        {!isLoading && !isError && asteroids.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-center">
              No asteroids found for the selected date range.
            </p>
          </div>
        )}

        {!isLoading && !isError && asteroids.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {asteroids.map((asteroid) => (
              <div
                key={asteroid.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-[#9e9e9e] pb-2">
                  {asteroid.name}
                </h2>

                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Close Approach Date
                    </span>
                    <span className="text-lg text-gray-800">
                      {asteroid.close_approach_data[0].close_approach_date}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Miss Distance
                    </span>
                    <span className="text-lg text-gray-800">
                      {parseFloat(
                        asteroid.close_approach_data[0].miss_distance.kilometers
                      ).toLocaleString()}{" "}
                      km
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Estimated Diameter
                    </span>
                    <span className="text-lg text-gray-800">
                      {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                        2
                      )}{" "}
                      -{" "}
                      {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                        2
                      )}{" "}
                      km
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Relative Velocity
                    </span>
                    <span className="text-lg text-gray-800">
                      {parseFloat(
                        asteroid.close_approach_data[0].relative_velocity
                          .kilometers_per_hour
                      ).toLocaleString()}{" "}
                      km/h
                    </span>
                  </div>

                  <div className="flex flex-col pt-2">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Hazard Status
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        asteroid.is_potentially_hazardous_asteroid
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {asteroid.is_potentially_hazardous_asteroid
                        ? "⚠️ Potentially Hazardous"
                        : "✓ Not Hazardous"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
