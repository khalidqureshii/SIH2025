import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Navbar from "./components/Navbar";
import SoilAdvisoryPage from "./pages/SoilAdvisoryPage";
import DiseaseDetectionPage from "./pages/DiseaseDetectionPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import DirectionHandler from "./components/DirectionHandler";

function App() {
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      {/* <DirectionHandler /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/bg-homepage.jpg')] bg-cover bg-center bg-no-repeat">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
                      <Navbar />
                      <Home />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Weather />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/disease"
            element={
              <>
                <ProtectedRoute>
                  <div className="min-h-screen bg-[url('/images/bg-diseasedetect.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
                      <Navbar />
                      <DiseaseDetectionPage />
                    </div>
                  </div>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/soil"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/soil-advisory.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
                      <Navbar />
                      <SoilAdvisoryPage />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
