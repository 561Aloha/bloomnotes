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
      {/* Header (tighter on mobile) */}
      <div className="mt-8 mb-6 px-4 sm:mt-12 sm:mb-8">
        <div className="text-5xl font-cursive font-bold text-gray-900">
          BloomNotes
        </div>

        <div className="mt-4 sm:mt-6 text-sm font-bold tracking-[0.2em] text-gray-900">
          ARRANGE YOUR BOUQUET
        </div>

        <p className="mt-2 sm:mt-3 text-gray-500">
          Choose a greenery style, shuffle, and preview your arrangement.
        </p>
      </div>

        {/* Preview (slightly shorter on mobile + keeps holder visually larger) */}
        <div className="mx-auto relative w-full max-w-[800px] h-[460px] sm:h-[300px] md:h-[620px] lg:h-[680px]">
          <BouquetPreview
            selectedFlowers={selectedFlowers}
            holder={currentHolder}
            clip={false}
            holderFit="contain"
          />

          {/* Desktop holder pill stays */}
          <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-8 py-2 rounded-full text-md font-bold text-gray-600 shadow-sm">
            {currentHolder.name}
          </div>

          {/* Desktop side arrows (slightly bigger) */}
          <button
            onClick={onPrevHolder}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg z-50 text-4xl leading-none"
            aria-label="Previous greenery"
            type="button"
          >
            ‹
          </button>

          <button
            onClick={onNextHolder}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg z-50 text-4xl leading-none"
            aria-label="Next greenery"
            type="button"
          >
            ›
          </button>
        </div>

        {/* ✅ MOBILE: arrows + holder pill all in one line */}
        <div className="md:hidden mt-2 flex justify-center items-center gap-4">
          <button
            onClick={onPrevHolder}
            className="w-14 h-14 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 font-semibold text-4xl leading-none flex items-center justify-center"
            type="button"
            aria-label="Previous greenery"
          >
            ‹
          </button>

          <div className="bg-white/85 px-5 py-2 rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-200 max-w-[70%] truncate">
            {currentHolder.name}
          </div>

          <button
            onClick={onNextHolder}
            className="w-14 h-14 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 font-semibold text-4xl leading-none flex items-center justify-center"
            type="button"
            aria-label="Next greenery"
          >
            ›
          </button>
        </div>

        {/* Shuffle (tighter) */}
        <div className="mt-4 mb-6 sm:mt-8 sm:mb-10 flex justify-center">
          <button
            onClick={onShuffle}
            className="px-8 py-3 rounded-full border border-gray-500 text-gray-900 text-sm tracking-widest uppercase hover:bg-white/60 transition-colors"
            type="button"
          >
            Shuffle Style
          </button>
        </div>

        {/* Navigation (tighter spacing) */}
        <div className="mt-3 sm:mt-2 flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-10 sm:px-12 py-3 rounded-md font-bold tracking-widest uppercase border border-gray-400 text-gray-700 hover:bg-white/60 transition-colors"
            type="button"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-10 sm:px-12 py-3 rounded-md font-bold tracking-widest uppercase bg-black text-white hover:opacity-90 transition-opacity"
            type="button"
          >
            Next
          </button>  
      </div>

      <div className="h-4 sm:h-5" />
    </div>
  );
};

export default ArrangementStep;
