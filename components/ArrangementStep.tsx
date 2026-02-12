import React from "react";
import { SelectedFlower, BouquetHolder, LayoutType } from "../types";
import BouquetPreview from "./BouquetPreview";

interface ArrangementStepProps {
  selectedFlowers: SelectedFlower[];
  currentHolder: BouquetHolder;
  layoutType: LayoutType;
  onPrevHolder: () => void;
  onNextHolder: () => void;
  onShuffle: () => void;
  onBack: () => void;
  onNext: () => void;
}

const ArrangementStep: React.FC<ArrangementStepProps> = ({
  selectedFlowers,
  currentHolder,
  onPrevHolder,
  onNextHolder,
  onShuffle,
  onBack,
  onNext,
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center animate-fadeIn bg-[#f3f0e6]">
      {/* Header */}
      <div className="mt-14 mb-10 px-4">
        <div className="text-5xl font-cursive font-bold text-gray-900">
          BloomNotes
        </div>

        <div className="mt-6 text-sm font-bold tracking-[0.2em] text-gray-900">
          ARRANGE YOUR BOUQUET
        </div>

        <p className="mt-3 text-gray-500">
          Choose a greenery style, shuffle, and preview your arrangement.
        </p>
      </div>

      {/* Main container */}
      <div className="w-full max-w-7xl px-4 sm:px-6">
        {/* Stage */}
        <div className="mx-auto relative w-full max-w-[800px] h-[420px] sm:h-[560px] md:h-[620px] lg:h-[680px]">
          <BouquetPreview
            selectedFlowers={selectedFlowers}
            holder={currentHolder}
            clip={false}
            holderFit="contain"
          />

          {/* ✅ Holder tag TOP on mobile (hidden on md+) */}
          <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 bg-white/85 px-6 py-2 rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-200">
            {currentHolder.name}
          </div>
          <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-8 py-2 rounded-full text-md font-bold text-gray-600 shadow-sm">
            {currentHolder.name}
          </div>

          <button
            onClick={onPrevHolder}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-50"
            aria-label="Previous greenery"
            type="button"
          >
            ‹
          </button>

          <button
            onClick={onNextHolder}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-50"
            aria-label="Next greenery"
            type="button"
          >
            ›
          </button>
        </div>
        <div className="md:hidden mt-2 flex justify-center items-center gap-14">
          <button
            onClick={onPrevHolder}
            className="px-6 py-3 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 font-semibold"
            type="button">
            ‹
          </button>
          <button
            onClick={onNextHolder}
            className="px-6 py-3 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 font-semibold"
            type="button">›
          </button>
        </div>

        {/* Shuffle */}
        <div className="mt-8 mb-10 flex justify-center">
          <button
            onClick={onShuffle}
            className="px-8 py-3 rounded-full border border-gray-500 text-gray-900 text-sm tracking-widest uppercase hover:bg-white/60 transition-colors"
            type="button"
          >
            Shuffle Style
          </button>
        </div>

        {/* Navigation */}
        <div className="mt-2 flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-12 py-3 rounded-md font-bold tracking-widest uppercase border border-gray-400 text-gray-700 hover:bg-white/60 transition-colors"
            type="button"
          >
            Back
          </button>

          <button
            onClick={onNext}
            className="px-12 py-3 rounded-md font-bold tracking-widest uppercase bg-black text-white hover:opacity-90 transition-opacity"
            type="button"
          >
            Next
          </button>
        </div>
      </div>

      <div className="h-5" />
    </div>
  );
};

export default ArrangementStep;
