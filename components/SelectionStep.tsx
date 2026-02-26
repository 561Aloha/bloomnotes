import React, { useMemo } from "react";
import { Flower, SelectedFlower } from "../types";
import { FLOWERS } from "../constants";

interface SelectionStepProps {
  selectedFlowers: SelectedFlower[];
  onAdd: (flower: Flower) => void;
  onRemove: (instanceId: string) => void;
  onNext: () => void;
}

type CountInfo = {
  name: string;
  count: number;
  instanceIds: string[];
};

type CountMap = Record<string, CountInfo>;

const SelectionStep: React.FC<SelectionStepProps> = ({
  selectedFlowers,
  onAdd,
  onRemove,
  onNext,
}) => {
  const MIN = 4;
  const MAX = 6;

  const isComplete =
    selectedFlowers.length >= MIN && selectedFlowers.length <= MAX;

  // Count selected flowers by id
  const counts: CountMap = useMemo(() => {
    return selectedFlowers.reduce((acc, f) => {
      const existing = acc[f.id];

      if (!existing) {
        acc[f.id] = {
          name: f.name,
          count: 1,
          instanceIds: [f.instanceId],
        };
      } else {
        existing.count += 1;
        existing.instanceIds.push(f.instanceId);
      }

      return acc;
    }, {} as CountMap);
  }, [selectedFlowers]);
  const chips = useMemo(() => {
    return (Object.entries(counts) as Array<[string, CountInfo]>).map(
      ([id, info]) => ({
        id,
        name: info.name,
        count: info.count,
        removeInstanceId: info.instanceIds[info.instanceIds.length - 1],
      })
    );
  }, [counts]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center animate-fadeIn bg-[#f3f0e6]">
      {/* Header */}
      <div className="mt-14 mb-10 px-4">
        <div className="text-5xl font-cursive font-bold text-gray-900">
          BloomNotes
        </div>

        <div className="mt-6 text-sm font-bold tracking-[0.2em] text-gray-900">
          PICK {MIN} TO {MAX} BLOOMS
        </div>

        <p className="mt-3 text-gray-500">
          Click on a flower’s name to deselect it.
        </p>
      </div>

      {/* Flower Grid */}
      <div className="w-full max-w-7xl px-4 sm:px-6">
        <div className="
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        gap-x-1 gap-y-1 sm:gap-x-3 sm:gap-y-3 place-items-center ">
        {FLOWERS.slice(0, 14).map((flower, index) => {
          const countForThis = counts[flower.id]?.count ?? 0;


          return (
            <button
              key={flower.id}
              onClick={() => {
                if (selectedFlowers.length >= MAX) return;
                onAdd(flower);
              }}
              disabled={selectedFlowers.length >= MAX}
              className={[
                "relative group focus:outline-none active:scale-[0.97] transition-transform",
                selectedFlowers.length >= MAX ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
              type="button"
            >
              <img
                src={flower.imageUrl}
                alt={flower.name}
                width={210}
                height={210}
                decoding="async"
                className="
                  w-[140px] h-[140px]
                  sm:w-[170px] sm:h-[170px]
                  md:w-[190px] md:h-[190px]
                  lg:w-[210px] lg:h-[210px]
                  object-cover rounded-xl transition-transform duration-300 group-hover:scale-105
                "
              />

              {countForThis > 0 && (
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  {countForThis}
                </div>
              )}
            </button>
          );
        })}
        </div>

        {/* Selection Chips */}
        <div className="mt-14 flex flex-wrap justify-center gap-4 min-h-[44px]">
          {chips.map((c) => (
            <button
              key={c.id}
              onClick={() => onRemove(c.removeInstanceId)}
              className="px-6 py-2 rounded-full border border-gray-500 text-gray-900 text-sm tracking-widest uppercase hover:bg-white/60 transition-colors"
              type="button"
            >
              {c.name} x{c.count}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="mt-12 flex justify-center">
          <button
            disabled={!isComplete}
            onClick={onNext}
            className={`px-12 py-3 rounded-md font-bold tracking-widest uppercase transition-all ${
              isComplete
                ? "bg-black text-white hover:opacity-100"
                : "bg-black text-white opacity-30 cursor-not-allowed"
            }`}
            type="button"
          >
            Next
          </button>
        </div>

        {!isComplete && (
          <p className="mt-4 text-xs text-gray-500">
            Select {MIN}–{MAX} flowers to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectionStep;
