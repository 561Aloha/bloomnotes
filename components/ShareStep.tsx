// ShareStep.tsx
import React, { useMemo, useState } from "react";
import { SelectedFlower, BouquetHolder, LayoutType } from "../types";
import { FLOWERS } from "../constants";
import BouquetPreview from "./BouquetPreview";
import { HOLDERS } from "../constants"; // or wherever your holders array is

/* ------------------- Share Payload Types ------------------- */

type ShareFlower = {
  id: string;
  instanceId: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  zIndex: number;
};

type SharePayload = {
  v: 1;
  holderId: string;
  layoutType: LayoutType;
  recipientName: string;
  messageBody: string;
  fromName: string;
  flowers: ShareFlower[];
};

/* ------------------- Encoding Helpers ------------------- */

const encodePayload = (payload: SharePayload) =>
  encodeURIComponent(
    btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
  );

const decodePayload = (s: string): SharePayload | null => {
  try {
    const json = decodeURIComponent(escape(atob(decodeURIComponent(s))));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

interface ShareStepProps {
  selectedFlowers: SelectedFlower[];
  holder: BouquetHolder;
  recipientName: string;
  messageBody: string;
  fromName: string;
  layoutType: LayoutType;
  onBack: () => void;
  onRestart: () => void;
}

const ShareStep: React.FC<ShareStepProps> = ({
  selectedFlowers,
  holder,
  recipientName,
  messageBody,
  fromName,
  layoutType,
  onBack,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);

  /* ----------- Build Payload ----------- */

  const payload: SharePayload = useMemo(
    () => ({
      v: 1,
      holderId: holder.id,
      layoutType,
      recipientName,
      messageBody,
      fromName,
      flowers: selectedFlowers.map((f) => ({
        id: f.id,
        instanceId: f.instanceId,
        rotation: f.rotation ?? 0,
        offsetX: f.offsetX ?? 0,
        offsetY: f.offsetY ?? 0,
        zIndex: f.zIndex ?? 1,
      })),
    }),
    [
      holder.id,
      layoutType,
      recipientName,
      messageBody,
      fromName,
      selectedFlowers,
    ]
  );

  const shareUrl = useMemo(() => {
    const encoded = encodePayload(payload);
    return `${window.location.origin}${window.location.pathname}#/share?data=${encoded}`;
  }, [payload]);

  /* ----------- Decode Payload (when opened via link) ----------- */

  const decoded = useMemo(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const data = params.get("data");
    return data ? decodePayload(data) : null;
  }, []);

  /* ----------- Build Render Model ----------- */
  const resolvedHolder =
    HOLDERS.find((h) => h.id === renderModel.holderId) ?? holder;

  const renderModel = useMemo(() => {
    const source = decoded ?? payload;

    const byId = new Map(FLOWERS.map((f) => [f.id, f]));

    const flowers: SelectedFlower[] = source.flowers
      .map((sf) => {
        const base = byId.get(sf.id);
        if (!base) return null;

        return {
          ...base,
          instanceId: sf.instanceId,
          rotation: sf.rotation,
          offsetX: sf.offsetX,
          offsetY: sf.offsetY,
          zIndex: sf.zIndex,
        } as SelectedFlower;
      })
      .filter(Boolean) as SelectedFlower[];

    // 🚫 DO NOT SORT — preserve payload order
    return {
      holderId: source.holderId,
      layoutType: source.layoutType,
      recipientName: source.recipientName,
      messageBody: source.messageBody,
      fromName: source.fromName,
      flowers,
    };
  }, [decoded, payload]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openedFromLink = Boolean(decoded);
  const hasLetter =
    Boolean(renderModel.recipientName?.trim()) ||
    Boolean(renderModel.messageBody?.trim()) ||
    Boolean(renderModel.fromName?.trim());

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center animate-fadeIn bg-[#f3f0e6]">

      <div className="mt-14 mb-2 px-4">
        <div className="text-5xl font-cursive font-bold text-gray-900">
          BloomNotes
        </div>

        <p className="mt-4 text-gray-600">
          {renderModel.fromName
            ? "Hi, I made this bouquet for you!"
            : "A bouquet made with love."}
        </p>
      </div>

      {/* Main container */}
      <div className="w-full max-w-7xl px-4 sm:px-6">
        <div className={`mx-auto relative w-full max-w-[800px] h-[520px] sm:h-[600px] md:h-[660px] lg:h-[700px] ${hasLetter ? "mb-12" : "mb-6"}`}>

        <BouquetPreview
          selectedFlowers={renderModel.flowers}
          holder={resolvedHolder}
          clip={false}
          holderFit="contain"
        />
        </div>

      {hasLetter && (
        <div className="relative -mt-24 mb-10 flex justify-center">
          <div className="w-[420px] max-w-full bg-white shadow-xl border border-gray-300 px-8 py-8 text-left">
            <div className="text-md text-gray-800 mb-6">
              {renderModel.recipientName ? `Dear ${renderModel.recipientName},` : "Dear,"}
            </div>

            <div className="text-md text-gray-700 leading-relaxed min-h-[16px] whitespace-pre-line">
              {renderModel.messageBody || ""}
            </div>

            <div className="text-md text-gray-800 mt-4 text-right">
              Yours truly,
              <br />
              {renderModel.fromName || ""}
            </div>
          </div>
        </div>
      )}


        {/* Share link section (only if NOT opened from link) */}
        {!openedFromLink && (
          <div className="w-full flex flex-col items-center mt-2 mb-10">
            <div className="w-full max-w-[760px]">
              <div className="text-xs font-bold tracking-widest text-gray-600 mb-3">
                CREATE SHAREABLE LINK
              </div>

              <div className="flex gap-2">
                <input
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700"
                />

                <button
                  onClick={copyLink}
                  className="px-5 py-3 rounded-md bg-black text-white text-sm font-semibold hover:opacity-90"
                  type="button"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={onBack}
                  className="px-12 py-3 rounded-md font-bold tracking-widest uppercase border border-gray-400 text-gray-700 hover:bg-white/60 transition-colors"
                  type="button"
                >
                  Back
                </button>

                <button
                  onClick={onRestart}
                  className="px-12 py-3 rounded-md font-bold tracking-widest uppercase bg-black text-white hover:opacity-90 transition-opacity"
                  type="button"
                >
                  Make Another
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
<div className="text-md text-gray-500 text-center space-y-2 mb-10">
  <div>
    made with Typescript, a tool by{" "}
    <a
      href="https://madebydianna.com"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-gray-700 transition-colors"
    >
      @MadebyDianna
    </a>

  </div>
  {openedFromLink ? (
    <button
      onClick={onRestart}
      className="underline cursor-pointer"
      type="button"
    >
      Create your own bouquet
    </button>
  ) : (
    <button
      onClick={onRestart}
      className="underline cursor-pointer"
      type="button"
    >
      make a bouquet now!
    </button>
  )}
</div>

</div>
</div>


  );
};

export default ShareStep;
