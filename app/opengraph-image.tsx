import { ImageResponse } from "next/og";
import { ogColors, ogFonts, ogSize } from "@/lib/og";

export const alt = "Le Faon: made-to-order garments in natural materials";
export const size = ogSize;
export const contentType = "image/png";

/** Site-wide share image: the wordmark on cream, quiet and centered. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: ogColors.bg,
          color: ogColors.ink,
          fontFamily: "EB Garamond",
        }}
      >
        <div style={{ fontSize: 132, fontWeight: 400, letterSpacing: 6 }}>Le Faon</div>
        <div style={{ marginTop: 18, fontSize: 36, fontStyle: "italic", color: ogColors.secondary }}>
          ~ Made to order ~
        </div>
        <div
          style={{
            marginTop: 56,
            width: 120,
            height: 1,
            background: "rgba(42,37,20,0.25)",
          }}
        />
        <div style={{ marginTop: 28, fontSize: 26, letterSpacing: 6, color: ogColors.secondary }}>
          COTTON · SILK · HEMP · WOOL
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
