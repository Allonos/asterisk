import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home.jsx";
import Header from "./components/ui/Header.jsx";
import DataAnalysis from "./pages/DataAnalysis.jsx";
import Explore from "./pages/Explore.jsx";

import "./App.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  const [startHeaderAnimation, setStartHeaderAnimation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isHome = location.pathname === "/";

    document.documentElement.style.overflow = isHome ? "hidden" : "";
    document.body.style.overflow = isHome ? "hidden" : "";
    const root = document.getElementById("root");
    if (root) root.style.overflow = isHome ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (root) root.style.overflow = "";
    };
  }, [location.pathname]);

  const handleLoadingComplete = () => {
    setStartHeaderAnimation(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <Header startAnimation={startHeaderAnimation} />
      <Routes>
        <Route
          path="/"
          element={<Home onLoadingComplete={handleLoadingComplete} />}
        />
        <Route path="/data-analysis" element={<DataAnalysis />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<p>here about page</p>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
