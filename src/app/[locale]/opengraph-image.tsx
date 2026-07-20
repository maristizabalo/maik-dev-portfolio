import { ImageResponse } from "next/og";

export const alt = "Maicol Aristizábal — Senior Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#0A0E14",
          padding: "80px",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#34E5C4",
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#FF6B57",
            }}
          />
          MAICOL · COMMAND CENTER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
            Maicol Aristizábal
          </div>
          <div style={{ fontSize: 34, color: "#34E5C4", marginTop: 18 }}>
            Senior Full Stack Developer
          </div>
          <div style={{ fontSize: 26, color: "#8B97A7", marginTop: 22 }}>
            Backend · Frontend · IA · De la arquitectura al despliegue
          </div>
        </div>
      </div>
    ),
    size,
  );
}
