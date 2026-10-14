import { ImageResponse } from "next/og";

export const alt = "I am Henry — Software Engineer y AI enthusiast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F6F5FB",
        color: "#0E1022",
        fontSize: 96,
        fontWeight: 800,
      }}
    >
      I am <span style={{ color: "#1F4BFF", marginLeft: 24 }}>Henry.</span>
    </div>,
    size,
  );
}
