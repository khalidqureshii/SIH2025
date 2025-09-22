import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Navbar from "./components/common/Navbar";
import SoilAdvisoryPage from "./pages/SoilAdvisoryPage";
import DiseaseDetectionPage from "./pages/DiseaseDetectionPage";
import MarketPage from "./pages/MarketPage";
import CropTimeline from "./pages/CropTimeline";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Feedback from "./pages/Feedback";
import ChatSidebar from "./components/chatbot/ChatSidebar";
import Footer from "./components/common/Footer";
import PlantIdentifier from "./pages/PlantIdentifier";
import Loader from "./components/common/Loader";
// import DirectionHandler from "./components/DirectionHandler";

function App() {
  return (
    <Suspense fallback={
      <div>
        <Loader src="https://lottie.host/bdccc051-2094-4d92-981a-6d6a9c7ef85d/EcgjRlUVTm.lottie" className="w-[300px] h-[300px]"/>
      </div>
    }>
      {/* <DirectionHandler /> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/bg-homepage.jpg')] bg-cover bg-center bg-no-repeat">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
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
                  <div className="min-h-screen bg-[url('/images/weather_new.jpg')] bg-cover bg-center bg-no-repeat">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
                      <Weather />
                    </div>
                  </div>
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
                    <div className="flex flex-col min-h-screen bg-white/30 backdrop-blur-sm overflow-hidden">
                      <div className="flex-1">
                        <DiseaseDetectionPage />
                      </div>
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
                      <SoilAdvisoryPage />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/market"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/market1.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
                      <MarketPage />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/timeline"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/timeline_bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
                      <CropTimeline />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/feedback.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen backdrop-blur-sm">
                      <Feedback />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/plant-identifier"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/plant-identifier.jpeg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen backdrop-blur-sm">
                      <PlantIdentifier />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatSidebar />
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
