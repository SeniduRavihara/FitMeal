import { CarouselManagement } from "@/features/carousel";

export default function CarouselPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.25rem",
          }}
        >
          Carousel Management
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          Manage featured items, promotions, and ads displayed on the home
          screen carousel
        </p>
      </div>
      <CarouselManagement />
    </div>
  );
}
