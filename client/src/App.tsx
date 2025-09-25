import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Navbar from "./components/common/Navbar";
import SoilAdvisoryPage from "./pages/SoilAdvisoryPage";
import MarketPage from "./pages/MarketPage";
import CropTimeline from "./pages/CropTimeline";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Feedback from "./pages/Feedback";
import ChatSidebar from "./components/chatbot/ChatSidebar";
import Footer from "./components/common/Footer";
import Scheme from "./pages/Scheme";
import CropAssistantPage from "./pages/DiseaseAndPlantIdentifier";
import Loader from "./components/common/Loader";
import TermsAndConditions from "./pages/TermsAndConditions";
import AboutUs from "./pages/AboutUs";
// import DirectionHandler from "./components/DirectionHandler";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // nothing to render
}

function App() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader
            src="https://lottie.host/bdccc051-2094-4d92-981a-6d6a9c7ef85d/EcgjRlUVTm.lottie"
            className="w-[300px] h-[300px]"
          />
        </div>
      }
    >
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
                      <Footer />
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
                      <Navbar />
                      <Weather />
                      <Footer />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />

          <Route
            path="/crop-identification-disease-detection"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/plant-identifier.jpeg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen backdrop-blur-sm">
                      <Navbar />
                      {/* <PlantIdentifier /> */}
                      <CropAssistantPage />
                      <Footer />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
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
                      <Footer />
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
                      <Footer />
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
                      <Navbar />
                      <CropTimeline />
                      <Footer />
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
                      <Footer />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scheme"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/soil-advisory.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen backdrop-blur-sm">
                      <Navbar />
                      <Scheme />
                      <Footer />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/terms"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/bg-homepage.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen backdrop-blur-sm">
                      <Navbar />
                      <TermsAndConditions />
                      <Footer />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <>
                  <div className="min-h-screen bg-[url('/images/bg-homepage.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                    <div className="min-h-screen backdrop-blur-sm">
                      <Navbar />
                      <AboutUs />
                      <Footer />
                    </div>
                  </div>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatSidebar />
        <ScrollToTop />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
