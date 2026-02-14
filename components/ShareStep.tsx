// ShareStep.tsx
import React, { useEffect, useMemo, useState } from "react";
import { SelectedFlower, BouquetHolder, LayoutType } from "../types";
import { FLOWERS } from "../constants";
import BouquetPreview from "./BouquetPreview";
import { supabase } from "../supabaseClient";

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

interface ShareStepProps {
  selectedFlowers: SelectedFlower[];
  holder: BouquetHolder;
  holders: BouquetHolder[];
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
  holders,
  recipientName,
  messageBody,
  fromName,
  layoutType,
  onBack,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [remotePayload, setRemotePayload] = useState<SharePayload | null>(null);
  const [openedFromLink, setOpenedFromLink] = useState(false);
  const [badLink, setBadLink] = useState(false);

  /* ----------- Build Payload (local) ----------- */
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
    [holder.id, layoutType, recipientName, messageBody, fromName, selectedFlowers]
  );

  /* ----------- Load from short share link (#/share/:id) ----------- */
  useEffect(() => {
    const hash = window.location.hash || "";
    const match = hash.match(/^#\/share\/([^?]+)/);
    const id = match?.[1];

    if (!id) return;

    setOpenedFromLink(true);

    (async () => {
      const { data, error } = await supabase
        .from("bouquet_links")
        .select("data")
        .eq("id", id)
        .single();

      if (error || !data?.data) {
        console.error("Failed to load bouquet:", error);
        setBadLink(true);
        return;
      }

      setRemotePayload(data.data as SharePayload);
    })();
  }, []);

  /* ----------- Create short share link ----------- */
  const createShareLink = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      return;
    }

    setIsGenerating(true);

    const res = await supabase
      .from("bouquet_links")
      .insert({ data: payload })
      .select("id");

    setIsGenerating(false);

    if (res.error) {
      alert(
        `code: ${res.error.code}\nmessage: ${res.error.message}\ndetails: ${res.error.details}\nhint: ${res.error.hint}`
      );
      return;
    }

    const newId = res.data?.[0]?.id;
    if (!newId) {
      alert("Insert succeeded but no id returned.");
      return;
    }

    const url = `${window.location.origin}#/share/${newId}`;
    setShareUrl(url);

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  /* ----------- Build Render Model ----------- */
  const renderModel = useMemo(() => {
    const source = remotePayload ?? payload;

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

    return {
      holderId: source.holderId ?? holder.id,
      layoutType: source.layoutType,
      recipientName: source.recipientName,
      messageBody: source.messageBody,
      fromName: source.fromName,
      flowers,
    };
  }, [remotePayload, payload, holder.id]);

  const hasLetter =
    Boolean(renderModel.recipientName?.trim()) ||
    Boolean(renderModel.messageBody?.trim()) ||
    Boolean(renderModel.fromName?.trim());

  const resolvedHolder =
    holders.find((h) => h.id === renderModel.holderId) ?? holder;

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center animate-fadeIn bg-[#f3f0e6]">
      {/* Header */}
      <div className={["px-4", hasLetter ? "mt-10 mb-6" : "mt-14 mb-10"].join(" ")}>
        <div className="text-5xl font-cursive font-bold text-gray-900">
          BloomNotes
        </div>

        <p className="mt-4 font-bold text-gray-900 text-lg sm:text-xl z-10">
          {renderModel.fromName ? "Hi, I made this bouquet for you!" : "A bouquet made with love."}
        </p>
      </div>

      {/* Main container */}
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        {badLink && (
          <div className="mx-auto w-full max-w-[760px] mb-6">
            <div className="bg-white border border-gray-300 shadow-xl px-6 py-5 text-left rounded-md">
              <div className="font-bold text-gray-900 mb-1">This share link is invalid.</div>
              <div className="text-sm text-gray-600">
                The bouquet data could not be loaded. Please ask for a new link.
              </div>
            </div>
          </div>
        )}

        <div
          className={[
            "mx-auto relative w-full max-w-[800px]",
            hasLetter
              ? "h-[420px] sm:h-[520px] md:h-[560px] lg:h-[600px] mb-6"
              : "h-[400px] sm:h-[420px] md:h-[460px] lg:h-[500px] mb-4",
          ].join(" ")}
        >
          <div className="absolute inset-0 -translate-y-8 sm:-translate-y-10 md:-translate-y-4">
            <BouquetPreview
              selectedFlowers={renderModel.flowers}
              holder={resolvedHolder}
              clip={false}
              holderFit="contain"
              interactive={false}
            />

          </div>
        </div>

        {/* Letter card */}
        {hasLetter && (
          <div className="relative mt-4 mb-10 flex justify-center">
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
          <div className="w-full flex flex-col items-center mb-10">
            <div className="w-full max-w-[760px]">
              <div className="text-xs font-bold tracking-widest text-gray-600 mb-3">
                CREATE SHAREABLE LINK
              </div>

              <div className="flex gap-2">
                <input
                  value={shareUrl}
                  readOnly
                  placeholder="Click Copy to generate a link"
                  className="flex-1 px-4 py-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700"
                />

                <button
                  onClick={createShareLink}
                  disabled={isGenerating}
                  className="px-5 py-3 rounded-md bg-black text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                  type="button"
                >
                  {isGenerating ? "Generating..." : copied ? "Copied!" : shareUrl ? "Copy Again" : "Copy"}
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={onBack}
                  className="px-4 py-2 text-xs sm:px-12 sm:py-3 rounded-md font-bold tracking-widest uppercase bg-black text-white hover:opacity-90"
                  type="button"
                >
                  Back
                </button>

                <button
                  onClick={onRestart}
                  className="px-6 py-2 sm:px-12 sm:py-3 rounded-md font-bold tracking-widest uppercase border border-gray-400 text-gray-700 hover:bg-white/60"
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
