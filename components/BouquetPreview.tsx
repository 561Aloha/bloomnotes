import React, { useMemo, useState } from "react";
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
const SIZE_STEPS = [0.85, 1.0, 1.15, 1.3] as const;

const BOX = 300;
const CX = BOX / 2; 
const CY = BOX / 2; 

/**
 * Generates organic bouquet positions.
 *
 * Strategy:
 * - One flower always goes near center (slightly randomized)
 * - Remaining flowers are placed radially outward at varying angles/distances
 * - Angles are biased toward the top arc (a bouquet fans upward)
 * - Each shuffle rotates/offsets the radial spread differently
 */
function computeBouquetLayout(
  flowers: SelectedFlower[],
  shuffleKey: number
): Array<{ x: number; y: number; z: number }> {
  const count = flowers.length;

  // Seeded PRNG — different per flower index + shuffleKey
  const rand = (seed: number): number => {
    let s = (seed ^ (shuffleKey * 2654435761)) >>> 0;
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = s ^ (s >>> 16);
    return (s >>> 0) / 0xffffffff;
  };

  // Shuffle flower indices so "center" role rotates each shuffle
  const order = flowers.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand(i * 77 + 3) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  // Global rotation offset per shuffle — rotates the whole fan
  const globalRotOffset = rand(999) * Math.PI * 2;

  return flowers.map((flower, idx) => {
    const role = order.indexOf(idx); // 0 = center flower

    let x: number, y: number;

    if (role === 0 || count === 1) {
      // CENTER flower — always near middle, slight organic nudge
      const nudgeX = (rand(idx * 13 + 1) - 0.5) * 28;
      const nudgeY = (rand(idx * 13 + 2) - 0.5) * 22;
      x = CX + nudgeX;
      y = CY + nudgeY;
    } else {

      const outerCount = count - 1;
      const outerRole = role - 1; // 0-based among outer flowers

      const arcStart = -Math.PI * 0.85; // ~-153° from right = upper-left
      const arcEnd   =  Math.PI * 0.85; // ~+153° from right = upper-right
      const arcSpan  = arcEnd - arcStart;

      const sliceSize = arcSpan / outerCount;
      const sliceCenter = arcStart + sliceSize * outerRole + sliceSize / 2;

      const jitter = (rand(idx * 17 + 5) - 0.5) * sliceSize * 0.7;
      const angle = sliceCenter + jitter + globalRotOffset * 0.15; // small global drift

      // Distance from center: closer flowers overlap more naturally
      // Vary between 55–100px radius
      const minR = 70;
      const maxR = 100;
      const r = minR + rand(idx * 23 + 7) * (maxR - minR);

      x = CX + Math.cos(angle) * r;
      y = CY + Math.sin(angle) * r; // sin(negative angle) = up

      x += (rand(idx * 31 + 9)  - 0.5) * 14;
      y += (rand(idx * 31 + 11) - 0.5) * 14;
    }

    return {
      x,
      y,
      z: flower.zIndex ?? idx + 1,
    };
  });
}

export default function BouquetPreview({
  selectedFlowers,
  holder,
  clip = true,
  holderFit = "cover",
  className = "",
  interactive = true,
  shuffleKey = 0,
}: {
  selectedFlowers: SelectedFlower[];
  holder: BouquetHolder;
  clip?: boolean;
  holderFit?: "cover" | "contain";
  className?: string;
  interactive?: boolean;
  shuffleKey?: number;
}) {
  const [sizeMap, setSizeMap] = useState<Record<string, number>>({});

  useMemo(() => {
    const ids = new Set(selectedFlowers.map((f) => f.instanceId));
    setSizeMap((prev) => {
      const next: Record<string, number> = {};
      for (const [k, v] of Object.entries(prev) as [string, number][]) {
        if (ids.has(k)) next[k] = v;
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlowers.map((f) => f.instanceId).join("|")]);

  const cycleSize = (instanceId: string) => {
    setSizeMap((prev) => {
      const cur = prev[instanceId] ?? 1;
      return { ...prev, [instanceId]: (cur + 1) % 4 };
    });
  };

  const layout = useMemo(
    () => computeBouquetLayout(selectedFlowers, shuffleKey),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedFlowers.map((f) => f.instanceId).join("|"), shuffleKey]
  );

  return (
    <div
      className={[
        "relative h-full w-full rounded-2xl bg-transparent flex items-center justify-center",
        clip ? "overflow-hidden" : "overflow-visible",
        className,
      ].join(" ")}
    >
      {/* 🌿 Holder / Greenery */}
      <img
        src={holder.imageUrl}
        alt={holder.name}
        className={[
          "absolute inset-0 w-full h-full opacity-90 transition-all duration-500 pointer-events-none",
          `object-${holderFit}`,
        ].join(" ")}
      />

      {/* 🌸 300×300 organic bouquet box — centered, pushed down slightly */}
      <div
        className="absolute"
        style={{
          width: BOX,
          height: BOX,
          top: "50%",
          left: "50%",
          // Shifted down from previous -65% → -52% so cluster sits lower on greenery
          transform: "translate(-50%, -42%)",
          zIndex: 10,
          // outline: "2px dashed red", // ← uncomment to debug
        }}
      >
        {selectedFlowers.map((flower, idx) => {
          const pos = layout[idx];
          if (!pos) return null;

          const isLarge =
            flower.id === "flower1" ||
            flower.id === "flower3" ||
            flower.id === "flower10" ||
            flower.id === "flower9";

          const FLOWER_SIZE = isLarge ? 140 : 125;
          const stepIndex = sizeMap[flower.instanceId] ?? 1;
          const sizeMult = SIZE_STEPS[stepIndex];

          return (
            <button
              key={flower.instanceId}
              type="button"
              disabled={!interactive}
              className={[
                "absolute bg-transparent border-0 p-0 m-0 flex items-center justify-center",
                interactive ? "cursor-pointer" : "cursor-default",
              ].join(" ")}
              style={{
                width: FLOWER_SIZE,
                height: FLOWER_SIZE,
                left: pos.x - FLOWER_SIZE / 2,
                top: pos.y - FLOWER_SIZE / 2,
                zIndex: 50 + pos.z,
                transition:
                  "left 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275), top 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!interactive) return;
                cycleSize(flower.instanceId);
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-[40px] opacity-15 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${getGlowColor(flower.id)} 0%, transparent 70%)`,
                }}
              />

              {/* Flower image */}
              <img
                src={flower.imageUrl}
                alt={flower.name}
                className="relative object-contain drop-shadow-xl w-full h-full"
                style={{
                  transform: `rotate(${flower.rotation ?? 0}deg) scale(${sizeMult})`,
                  transition:
                    "transform 220ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  transformOrigin: "center center",
                  touchAction: "manipulation",
                }}
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}