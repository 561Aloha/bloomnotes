import React from "react";
import { SelectedFlower, BouquetHolder } from "../types";

/* ------------------- Glow Colors ------------------- */

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
};

const getGlowColor = (id: string) => glowMap[id] || "#ffffff";

/* ------------------- Stable Jitter ------------------- */

function jitterFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const x = (h % 25) - 12;
  const y = ((h >> 5) % 25) - 12;
  return { x, y };
}

/* ------------------- Component ------------------- */

export default function BouquetPreview({
  selectedFlowers,
  holder,
  clip = true,
  holderFit = "contain",
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
        "relative h-full w-full rounded-2xl shadow-inner bg-transparent flex items-center justify-center",
        clip ? "overflow-hidden" : "overflow-visible",
        className,
      ].join(" ")}
    >
      {/* Holder / background image */}
      <img
        src={holder.imageUrl}
        alt={holder.name}
        className={`w-full h-full object-${holderFit} opacity-90 transition-all duration-500`}
      />

      {/* Flowers overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={[
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            // ✅ smaller on mobile, bigger on desktop
            "scale-[0.85] sm:scale-[0.95] md:scale-[1.05] lg:scale-[1.25]",
            // ✅ move bouquet up a bit (more on mobile)
            "-translate-y-10 sm:-translate-y-14 md:-translate-y-16",
          ].join(" ")}
          style={{
            // ✅ keep cluster from becoming too wide on phones
            width: "clamp(220px, 58vw, 520px)",
          }}
        >
          {/* ✅ tighter spacing on mobile */}
          <div className="flex flex-wrap justify-center items-end -space-x-10 -space-y-16 sm:-space-x-14 sm:-space-y-24 relative">
            {selectedFlowers.map((flower, idx) => {
              const j = jitterFor(flower.instanceId);

              const isLarge =
                flower.id === "1" || flower.id === "3" || flower.id === "9";

              const z = flower.zIndex ?? idx + 1;

              // ✅ slightly reduced sizing so it behaves better on mobile
              const sizeClass = isLarge
                ? "w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64"
                : z <= 4
                ? "w-36 h-36 sm:w-42 sm:h-42 lg:w-48 lg:h-48"
                : "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36";

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
                    className="absolute rounded-full blur-[70px] opacity-10"
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
                    className={`relative object-contain drop-shadow-2xl ${sizeClass}`}
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
