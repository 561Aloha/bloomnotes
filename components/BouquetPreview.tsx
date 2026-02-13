import React from "react";
import { SelectedFlower, BouquetHolder } from "../types";

const glowMap: Record<string, string> = {
  flower1: "#A1A7EB",
  flower2: "#2838DF",
  flower3: "#F9B20E",
  flower4: "#012761",
  flower5: "#FE967E",
  flower6: "#FE967E",
  flower7: "#CA418D",
  flower8: "#5FA1DE",
  flower9: "#9E0935",
  flower10: "#E9C6F1",
  flower11: "#3C1260",
  flower12: "#E9C6F1",
  flower13: "#3C1260",
};
const getGlowColor = (id: string) => glowMap[id] || "#ffffff";

function jitterFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const x = (h % 25) - 12;
  const y = ((h >> 5) % 25) - 12;
  return { x, y };
}

export default function BouquetPreview({
  selectedFlowers,
  holder,
  clip = true,
  holderFit = "cover",
  className = "",
}: {
  selectedFlowers: SelectedFlower[];
  holder: BouquetHolder;
  clip?: boolean;
  holderFit?: "cover" | "contain";
  className?: string;
}) {
  return (
    <div
      className={[
        "relative h-full w-full rounded-2xl bg-transparent flex items-center justify-center",
        clip ? "overflow-hidden" : "overflow-visible",
        className,
      ].join(" ")}
    >
      {/* ✅ Make greenery/holder a bit larger on mobile */}
      <img
        src={holder.imageUrl}
        alt={holder.name}
        className={[
          "w-full h-full opacity-90 transition-all duration-500",
          `object-${holderFit}`,
          "scale-[1.08] sm:scale-100",
        ].join(" ")}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className={[
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            // ✅ Bouquet sits a touch lower on mobile (more natural + fuller)
            "translate-y-[-92px] sm:translate-y-[-125px] md:translate-y-[-140px] lg:translate-y-[-155px]",
          ].join(" ")}
          style={{
            width: "clamp(220px, 72vw, 440px)",
          }}
        >
          <div
            className={[
              "flex flex-wrap justify-center items-end relative",
              // ✅ Flowers closer together on mobile
              "-space-x-12 -space-y-14",
              "sm:-space-x-10 sm:-space-y-20",
              "md:-space-x-14 md:-space-y-24",
            ].join(" ")}
          >
            {selectedFlowers.map((flower, idx) => {
              const j = jitterFor(flower.instanceId);

              const isLarge =
                flower.id === "flower1" ||
                flower.id === "flower3" ||
                flower.id === "flower9";

              const z = flower.zIndex ?? idx + 1;

              const sizeClass = isLarge
                ? "w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64"
                : z <= 4
                ? "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48"
                : "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40";

              return (
                <div
                  key={flower.instanceId}
                  className="relative flex justify-center items-end"
                  style={{
                    zIndex: 50 + z,
                    transform: `translate(${(flower.offsetX ?? 0) + j.x}px, ${
                      (flower.offsetY ?? 0) + j.y
                    }px)`,
                    transition:
                      "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  <div
                    className="absolute rounded-full blur-[60px] sm:blur-[70px] opacity-10"
                    style={{
                      width: "140%",
                      height: "140%",
                      background: `radial-gradient(circle, ${getGlowColor(
                        flower.id
                      )} 0%, transparent 70%)`,
                    }}
                  />

                  <img
                    src={flower.imageUrl}
                    alt={flower.name}
                    className={`relative object-contain drop-shadow-xl ${sizeClass}`}
                    style={{ transform: `rotate(${flower.rotation ?? 0}deg)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
