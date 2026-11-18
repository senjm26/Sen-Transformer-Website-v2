import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The preview shown when the site is shared on LinkedIn, email, chat apps, and so on
export const alt = "Sen Engineering Solutions: the SMART Power Flow Controller, with the tested 33 kV Sen Transformer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/sentransformer.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(135deg, #10275C 0%, #071330 60%, #050B1E 100%)", color: "white" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px 0 72px" }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#93C5FD" }}>
            Sen Engineering Solutions, Inc.
          </div>
          <div style={{ marginTop: 22, fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            More power through the lines you already have
          </div>
          <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.35, color: "#B6C2D9" }}>
            The SMART Power Flow Controller. 33 kV, ±6.5 MVA unit built and tested.
          </div>
        </div>
        {/* 1202x1297 photo cropped to fill a 460px-wide column */}
        <img src={photoSrc} alt="" width={460} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
