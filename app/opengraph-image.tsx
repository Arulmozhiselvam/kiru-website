import { ImageResponse } from "next/og";

export const alt = "KIRU — Kiruthigaah Ramesh, Bharatanatyam Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ⚠ Once real photography exists, consider replacing this generated card
// with a static /app/opengraph-image.jpg featuring the artist.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "radial-gradient(ellipse at 50% 40%, #26352A 0%, #171B16 70%)",
          color: "#EEE8DC", fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 150, letterSpacing: 40, paddingLeft: 40, fontWeight: 300 }}>KIRU</div>
        <div style={{ width: 220, height: 1, background: "#B18B52", margin: "26px 0 30px" }} />
        <div style={{ fontSize: 40, fontStyle: "italic" }}>Kiruthigaah Ramesh</div>
        <div style={{ fontSize: 20, letterSpacing: 8, color: "#B18B52", marginTop: 22, textTransform: "uppercase" }}>
          Bharatanatyam · Malaysia
        </div>
        <div style={{ fontSize: 26, fontStyle: "italic", opacity: 0.75, marginTop: 34 }}>Where Tradition Becomes Expression.</div>
      </div>
    ),
    size
  );
}
