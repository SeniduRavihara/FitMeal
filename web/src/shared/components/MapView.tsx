"use client";
import { useEffect, useState } from "react";

interface MapViewProps {
  latitude: number;
  longitude: number;
  address?: string;
  height?: string;
  zoom?: number;
}

export default function MapView({
  latitude,
  longitude,
  address,
  height = "300px",
  zoom = 15,
}: MapViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simple validation
    if (!latitude || !longitude) {
      setError("Invalid coordinates provided");
      setLoading(false);
      return;
    }

    // Simulate loading time for iframe
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [latitude, longitude]);

  // Create Google Maps embed URL that shows the point and track
  const createMapUrl = () => {
    // Use the standard Google Maps embed that shows the location marker
    return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&t=m&output=embed`;
  };

  // Alternative URL with API key (if available)
  const createMapUrlWithKey = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/view";
    const params = new URLSearchParams({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      center: `${latitude},${longitude}`,
      zoom: zoom.toString(),
      maptype: "roadmap",
    });

    return `${baseUrl}?${params.toString()}`;
  };

  // Create Google Maps directions URL
  const createDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  };

  if (loading) {
    return (
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "2px solid #d1d5db",
              borderTop: "2px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 8px",
            }}
          />
          <style jsx>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Loading map...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fef2f2",
          borderRadius: "8px",
          border: "1px solid #fecaca",
          color: "#dc2626",
        }}
      >
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <div
            style={{
              fontSize: "0.875rem",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            🗺️ {error}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#9ca3af",
              marginBottom: "8px",
            }}
          >
            Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </div>
        </div>
      </div>
    );
  }

  // Use the standard Google Maps URL that shows the point and track
  const mapUrl = createMapUrl();

  // Debug: Log the map URL
  console.log("Map URL:", mapUrl);
  console.log("Coordinates:", latitude, longitude);

  return (
    <div
      style={{
        height,
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Google Maps iframe */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{
          border: "none",
          borderRadius: "8px",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Delivery Location Map"
        onError={() => {
          console.error("Google Maps iframe failed to load");
          setError(
            "Failed to load map. Please check your internet connection."
          );
        }}
      />

      {/* Overlay with directions button only */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
          padding: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
        }}
      >
        <button
          onClick={() => window.open(createDirectionsUrl(), "_blank")}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          🧭 Get Directions
        </button>
      </div>
    </div>
  );
}
