import { ImageResponse } from "next/og";
import { getProduct, listProductSlugs } from "@/lib/data/catalog";
import { ogColors, ogFonts, ogSize, publicImageDataUri } from "@/lib/og";

export const alt = "A Le Faon piece, made to order";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await listProductSlugs()).map((slug) => ({ slug }));
}

/** Per-piece share image: the first photograph beside the name. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  const photo = product ? await publicImageDataUri(product.colorways[0].images[0].src) : null;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: ogColors.bg, fontFamily: "EB Garamond" }}>
        <div style={{ width: 460, height: "100%", display: "flex", background: ogColors.surface }}>
          {photo && (
            <img src={photo} alt="" width={460} height={630} style={{ objectFit: "cover", width: 460, height: 630 }} />
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            color: ogColors.ink,
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: 5, color: ogColors.secondary }}>MADE TO ORDER</div>
          <div style={{ marginTop: 16, fontSize: 84, fontWeight: 400, lineHeight: 1.05 }}>
            {product?.name ?? "The Collection"}
          </div>
          {product && (
            <div style={{ marginTop: 20, fontSize: 34, fontStyle: "italic", color: ogColors.secondary }}>
              {product.material}
            </div>
          )}
          <div style={{ marginTop: 64, fontSize: 40, fontWeight: 400, letterSpacing: 3 }}>Le Faon</div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
