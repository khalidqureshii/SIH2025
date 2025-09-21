import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Navbar from "./components/common/Navbar";
import SoilAdvisoryPage from "./pages/SoilAdvisoryPage";
import DiseaseDetectionPage from "./pages/DiseaseDetectionPage";
import MarketPage from "./pages/MarketPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Feedback from "./pages/Feedback";
import ChatSidebar from "./components/chatbot/ChatSidebar";
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
                  <div className="min-h-screen bg-[url('/images/thunder.jpg')] bg-cover bg-center bg-no-repeat">
                    <div className="min-h-screen bg-white/30 backdrop-blur-sm">
                      <Navbar />
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
                      <Navbar />
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
                      <Navbar />
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
                      <Navbar />
                      <MarketPage />
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
                      <Navbar />
                      <Feedback />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatSidebar />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
