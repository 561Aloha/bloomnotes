// ShareStep.tsx
import React, { useMemo, useState } from "react";
import { SelectedFlower, BouquetHolder, LayoutType } from "../types";
import { FLOWERS, HOLDERS } from "../constants";
import BouquetPreview from "./BouquetPreview";

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
    // hash routing: #/share?data=...
    return `${window.location.origin}${window.location.pathname}#/share?data=${encoded}`;
  }, [payload]);

  /* ----------- Decode Payload (when opened via link) ----------- */

  const { decoded, hasDataParam } = useMemo(() => {
    const hash = window.location.hash || "";
    const q = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(q);
    const data = params.get("data");
    return {
      decoded: data ? decodePayload(data) : null,
      hasDataParam: Boolean(data),
    };
  }, []);

  const openedFromLink = hasDataParam;
  const badLink = hasDataParam && !decoded;

  /* ----------- Build Render Model ----------- */

  const renderModel = useMemo(() => {
    // If opened via link and decode failed, fall back to current payload safely
    const source = decoded ?? payload;

    const byId = new Map(FLOWERS.map((f) => [f.id, f]));

    const flowers: SelectedFlower[] = source.flowers
      .map((sf) => {
        const base = byId.get(sf.id);
        if (!base) return null;

        return {
          ...base,
          instanceId: sf.instanceId,
          rotation: sf.rotation ?? 0,
          offsetX: sf.offsetX ?? 0,
          offsetY: sf.offsetY ?? 0,
          zIndex: sf.zIndex ?? 1,
        } as SelectedFlower;
      })
      .filter(Boolean) as SelectedFlower[];

    // Preserve payload order — no sorting
    return {
      holderId: source.holderId,
      layoutType: source.layoutType,
      recipientName: source.recipientName,
      messageBody: source.messageBody,
      fromName: source.fromName,
      flowers,
    };
  }, [decoded, payload]);

  // ✅ Resolve holder from the decoded holderId (so share links show correct holder)
  const resolvedHolder =
    HOLDERS.find((h) => h.id === renderModel.holderId) ?? holder;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ✅ Hide the letter card if everything is empty
  const hasLetter =
    Boolean(renderModel.recipientName?.trim()) ||
    Boolean(renderModel.messageBody?.trim()) ||
    Boolean(renderModel.fromName?.trim());

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center animate-fadeIn bg-[#f3f0e6]">
      {/* Header */}
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
        {/* If the link is invalid, show a friendly note (optional but helpful) */}
        {badLink && (
          <div className="mx-auto w-full max-w-[760px] mb-6">
            <div className="bg-white border border-gray-300 shadow-xl px-6 py-5 text-left rounded-md">
              <div className="font-bold text-gray-900 mb-1">
                This share link is invalid.
              </div>
              <div className="text-sm text-gray-600">
                The bouquet data could not be loaded. Please ask for a new link.
              </div>
            </div>
          </div>
        )}

        {/* Stage */}
        <div
          className={[
            "mx-auto relative w-full max-w-[800px] h-[520px] sm:h-[600px] md:h-[660px] lg:h-[700px]",
            hasLetter ? "mb-12" : "mb-6",
          ].join(" ")}
        >
          <BouquetPreview
            selectedFlowers={renderModel.flowers}
            holder={resolvedHolder}
            clip={false}
            holderFit="contain"
          />
        </div>

        {/* Letter card (only if there is content) */}
        {hasLetter && (
          <div className="relative -mt-24 mb-10 flex justify-center">
            <div className="w-[420px] max-w-full bg-white shadow-xl border border-gray-300 px-8 py-8 text-left">
              <div className="text-md text-gray-800 mb-6">
                {renderModel.recipientName?.trim()
                  ? `Dear ${renderModel.recipientName.trim()},`
                  : "Dear,"}
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

        {/* Share link section (only if NOT opened from a share link) */}
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

          <button
            onClick={onRestart}
            className="underline cursor-pointer"
            type="button"
          >
            {openedFromLink ? "Create your own bouquet" : "make a bouquet now!"}
          </button>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
};

export default ShareStep;
