import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2 } from "lucide-react";
import { LocationInput } from "./LocationInput";

interface MapLocationInputProps {
  latitude: string;
  longitude: string;
  setLatitude: (value: string) => void;
  setLongitude: (value: string) => void;
}

interface Coordinate {
  lat: number;
  lng: number;
}

const MapLocationInput: React.FC<MapLocationInputProps> = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const polygonRef = useRef<any>(null);

  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [useManualInput, setUseManualInput] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Load Leaflet CSS and JS
  useEffect(() => {
    if (useManualInput) return;

    const loadLeaflet = () => {
      // Check if already loaded
      if ((window as any).L) {
        setMapLoaded(true);
        return;
      }

      // Load CSS
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      cssLink.crossOrigin = "";
      document.head.appendChild(cssLink);

      // Load JS
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.crossOrigin = "";
      script.async = true;

      script.onload = () => {
        if ((window as any).L) {
          setMapLoaded(true);
        } else {
          setMapError(true);
        }
      };

      script.onerror = () => {
        setMapError(true);
      };

      document.head.appendChild(script);
    };

    loadLeaflet();
  }, [useManualInput]);

  // Initialize map only once, with geolocation support
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || useManualInput) return;

    let mapInstance: any = null;
    let initialCoords: [number, number] = [20.5937, 78.9629]; // Default: India
    let initialZoom = 5;

    const setupMap = (coords: [number, number], zoom: number) => {
      try {
        const L = (window as any).L;
        mapInstance = L.map(mapRef.current).setView(coords, zoom);

        // Add tile layer with multiple fallback options
        const tileLayers = [
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
        ];
        let currentLayerIndex = 0;
        const addTileLayer = (index: number) => {
          if (index >= tileLayers.length) return;
          const tileLayer = L.tileLayer(tileLayers[index], {
            attribution: "",
            maxZoom: 18,
          }).addTo(mapInstance);
          tileLayer.on("tileerror", () => {
            if (currentLayerIndex < tileLayers.length - 1) {
              currentLayerIndex++;
              mapInstance.removeLayer(tileLayer);
              addTileLayer(currentLayerIndex);
            }
          });
        };
        addTileLayer(0);

        // Store map instance in ref for later use
        (mapRef as any).current.mapInstance = mapInstance;

        // Add click handler
        mapInstance.on("click", (e: any) => {
          if (drawingRef.current) {
            const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
            // Add marker and store in ref
            const markerIcon = L.divIcon({
              html: '<div style="background-color: #22c55e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #16a34a; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
              iconSize: [16, 16],
              iconAnchor: [8, 8],
              className: "custom-div-icon",
            });
            const marker = L.marker([e.latlng.lat, e.latlng.lng], {
              icon: markerIcon,
            }).addTo(mapInstance);
            markersRef.current.push(marker);

            // Add point to pointsRef
            pointsRef.current.push(newPoint);
            setPoints([...pointsRef.current]);

            // Draw polygon if we have enough points
            if (pointsRef.current.length >= 3) {
              // Remove existing polygon
              if (polygonRef.current) {
                mapInstance.removeLayer(polygonRef.current);
              }
              // Add new polygon
              const polygon = L.polygon(pointsRef.current, {
                fillColor: "#22c55e",
                fillOpacity: 0.3,
                color: "#16a34a",
                weight: 2,
              }).addTo(mapInstance);
              polygonRef.current = polygon;

              // Calculate centroid
              const centroid = calculateCentroid(
                pointsRef.current.map((p) => ({ lat: p[0], lng: p[1] }))
              );
              setLatitude(centroid.lat.toString());
              setLongitude(centroid.lng.toString());
            }
          }
        });

        // Cleanup
        return () => {
          if (mapInstance) {
            mapInstance.remove();
          }
        };
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError(true);
      }
    };

    // Try to get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          initialCoords = [position.coords.latitude, position.coords.longitude];
          initialZoom = 14;
          setupMap(initialCoords, initialZoom);
        },
        () => {
          // User denied or error, use default
          setupMap(initialCoords, initialZoom);
        }
      );
    } else {
      setupMap(initialCoords, initialZoom);
    }
    // No cleanup here, handled in setupMap
  }, [mapLoaded, useManualInput]);

  // Refs for drawing and points to avoid re-initialization
  const drawingRef = useRef(drawing);
  const pointsRef = useRef<[number, number][]>([]);
  useEffect(() => {
    drawingRef.current = drawing;
  }, [drawing]);
  useEffect(() => {
    if (!drawing) pointsRef.current = [];
  }, [drawing]);

  // Clear markers and polygon when clearing area

  const calculateCentroid = (coordinates: Coordinate[]): Coordinate => {
    const lat =
      coordinates.reduce((sum, coord) => sum + coord.lat, 0) /
      coordinates.length;
    const lng =
      coordinates.reduce((sum, coord) => sum + coord.lng, 0) /
      coordinates.length;
    return { lat, lng };
  };

  const startDrawing = () => {
    setDrawing(true);
    setPoints([]);
    setLatitude("");
    setLongitude("");
  };

  const finishDrawing = () => {
    if (points.length < 3) {
      alert("Please select at least 3 points to create a polygon");
      return;
    }
    setDrawing(false);
  };

  const clearArea = () => {
    setPoints([]);
    setDrawing(false);
    setLatitude("");
    setLongitude("");
    pointsRef.current = [];
    // Remove markers from map
    if (
      markersRef.current.length &&
      mapRef.current &&
      (mapRef.current as any).mapInstance
    ) {
      markersRef.current.forEach((marker) => {
        (mapRef.current as any).mapInstance.removeLayer(marker);
      });
      markersRef.current = [];
    }
    // Remove polygon from map
    if (
      polygonRef.current &&
      mapRef.current &&
      (mapRef.current as any).mapInstance
    ) {
      (mapRef.current as any).mapInstance.removeLayer(polygonRef.current);
      polygonRef.current = null;
    }
  };

  const ManualInputs = () => (
    <LocationInput
      latitude={latitude}
      longitude={longitude}
      setLatitude={setLatitude}
      setLongitude={setLongitude}
    />
  );

  const MapInterface = () => (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={startDrawing}
          disabled={drawing}
          className="bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          {drawing ? "Drawing..." : "Start Drawing Area"}
        </Button>
        {drawing && points.length >= 3 && (
          <Button
            onClick={finishDrawing}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            Finish Area ({points.length} points)
          </Button>
        )}
        {latitude && longitude && (
          <Button
            onClick={clearArea}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div
        ref={mapRef}
        className="w-full h-80 rounded-lg border-2 border-gray-300"
        style={{ minHeight: "320px" }}
      />

      {drawing && (
        <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
          Click on the map to mark your farm boundaries. You need at least 3
          points.
          {points.length > 0 && ` Points added: ${points.length}`}
        </div>
      )}

      {latitude && longitude && (
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            ✓ Farm center coordinates: {parseFloat(latitude).toFixed(6)},{" "}
            {parseFloat(longitude).toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );

  const MapPlaceholder = () => (
    <div className="w-full h-80 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center">
      <MapPin className="h-12 w-12 text-gray-400 mb-3" />
      <p className="text-gray-500 text-center mb-2">Loading Map...</p>
      <Button
        onClick={() => setUseManualInput(true)}
        variant="outline"
        size="sm"
      >
        Use Manual Input
      </Button>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-green-600" />
          Farm Location
        </h3>
        <Button
          onClick={() => setUseManualInput(!useManualInput)}
          variant="outline"
          size="sm"
        >
          {useManualInput ? "Use Map" : "Manual Input"}
        </Button>
      </div>

      {useManualInput ? (
        <ManualInputs />
      ) : mapError ? (
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-sm mb-2">Map could not be loaded</p>
            <Button
              onClick={() => setUseManualInput(true)}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              Use Manual Input
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Always render map container when not manual input and no error */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={startDrawing}
              disabled={drawing}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              {drawing ? "Drawing..." : "Start Drawing Area"}
            </Button>
            {drawing && points.length >= 3 && (
              <Button
                onClick={finishDrawing}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                Finish Area ({points.length} points)
              </Button>
            )}
            {latitude && longitude && (
              <Button
                onClick={clearArea}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <div
            ref={mapRef}
            className="w-full h-80 rounded-lg border-2 border-gray-300"
            style={{ minHeight: "320px" }}
          />
          {drawing && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              Click on the map to mark your farm boundaries. You need at least 3
              points.
              {points.length > 0 && ` Points added: ${points.length}`}
            </div>
          )}
          {latitude && longitude && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ Farm center coordinates: {parseFloat(latitude).toFixed(6)},{" "}
                {parseFloat(longitude).toFixed(6)}
              </p>
            </div>
          )}
          {!mapLoaded && <MapPlaceholder />}
        </div>
      )}
    </div>
  );
};

export default MapLocationInput;
