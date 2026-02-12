import React, { useEffect, useState } from "react";
import {
  Step,
  SelectedFlower,
  Flower,
  LayoutType,
  BouquetHolder,
} from "./types";

import SelectionStep from "./components/SelectionStep";
import ArrangementStep from "./components/ArrangementStep";
import MessageStep from "./components/MessageStep";
import ShareStep from "./components/ShareStep";

import greenery2 from "./assets/greenery2.png";
import greenery3 from "./assets/greenery3.png";
import greenery4 from "./assets/greenery4.png";
import greenery5 from "./assets/greenery5.png";
import greenery6 from "./assets/greenery6.png";
import greenery7 from "./assets/greenery7.png";

/* ✅ Holders defined here */
const HOLDERS: BouquetHolder[] = [
  { id: "greenery-2", name: "Greenery 2", imageUrl: greenery2 },
  { id: "greenery-3", name: "Greenery 3", imageUrl: greenery3 },
  { id: "greenery-4", name: "Greenery 4", imageUrl: greenery4 },
  { id: "greenery-5", name: "Greenery 5", imageUrl: greenery5 },
  { id: "greenery-6", name: "Greenery 6", imageUrl: greenery6 },
  { id: "greenery-7", name: "Greenery 7", imageUrl: greenery7 },
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("selection");
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([]);
  const [currentHolderIndex, setCurrentHolderIndex] = useState(0);
  const [layoutType, setLayoutType] = useState<LayoutType>("circle");
  const [recipientName, setRecipientName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [fromName, setFromName] = useState("");

  // ✅ Share mode: if URL is #/share?data=..., render ShareStep no matter what
  const [isShareMode, setIsShareMode] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setIsShareMode(window.location.hash.startsWith("#/share"));
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const addFlower = (flower: Flower) => {
    if (selectedFlowers.length >= 8) return;

    const newFlower: SelectedFlower = {
      ...flower,
      instanceId: Math.random().toString(36).substring(2, 10),
      zIndex: selectedFlowers.length + 1,
      rotation: Math.random() * 30 - 15,
      offsetX: Math.random() * 20 - 10,
      offsetY: Math.random() * 20 - 10,
    };

    setSelectedFlowers((prev) => [...prev, newFlower]);
  };

  const removeFlower = (instanceId: string) => {
    setSelectedFlowers((prev) => prev.filter((f) => f.instanceId !== instanceId));
  };

  const shuffleBouquet = () => {
    setSelectedFlowers((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled.map((f, i) => ({
        ...f,
        zIndex: i + 1,
        rotation: Math.random() * 40 - 20,
        offsetX: Math.random() * 30 - 15,
        offsetY: Math.random() * 30 - 15,
      }));
    });

    setLayoutType((prev) => (prev === "circle" ? "diamond" : "circle"));
  };

  const nextHolder = () =>
    setCurrentHolderIndex((prev) => (prev + 1) % HOLDERS.length);

  const prevHolder = () =>
    setCurrentHolderIndex((prev) => (prev - 1 + HOLDERS.length) % HOLDERS.length);

  const resetToStart = () => {
    setSelectedFlowers([]);
    setRecipientName("");
    setMessageBody("");
    setFromName("");
    setCurrentStep("selection");
    setCurrentHolderIndex(0);
    setLayoutType("circle");
    // ✅ also clear share hash if you're in share mode
    window.location.hash = "#/";
  };

  // ✅ IMPORTANT: when in share mode, render ShareStep even if app state is empty
  if (isShareMode) {
    return (
      <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 bg-[#f3f0e6]">
        <main className="w-full">
          <ShareStep
            selectedFlowers={selectedFlowers} // ShareStep will decode if opened from link
            holder={HOLDERS[currentHolderIndex] ?? HOLDERS[0]}
            recipientName={recipientName}
            messageBody={messageBody}
            fromName={fromName}
            layoutType={layoutType}
            onBack={() => {
              // optional: bring them back to builder
              window.location.hash = "#/";
              setIsShareMode(false);
              setCurrentStep("selection");
            }}
            onRestart={resetToStart}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <main className="w-full glass rounded-none p-6 shadow-xl relative overflow-hidden">
        {currentStep === "selection" && (
          <SelectionStep
            selectedFlowers={selectedFlowers}
            onAdd={addFlower}
            onRemove={removeFlower}
            onNext={() => setCurrentStep("arrangement")}
          />
        )}

        {currentStep === "arrangement" && (
          <ArrangementStep
            selectedFlowers={selectedFlowers}
            currentHolder={HOLDERS[currentHolderIndex]}
            layoutType={layoutType}
            onPrevHolder={prevHolder}
            onNextHolder={nextHolder}
            onShuffle={shuffleBouquet}
            onBack={() => setCurrentStep("selection")}
            onNext={() => setCurrentStep("message")}
          />
        )}

        {currentStep === "message" && (
          <MessageStep
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            messageBody={messageBody}
            setMessageBody={setMessageBody}
            fromName={fromName}
            setFromName={setFromName}
            onBack={() => setCurrentStep("arrangement")}
            onNext={() => setCurrentStep("share")}
          />
        )}

        {currentStep === "share" && (
          <ShareStep
            selectedFlowers={selectedFlowers}
            holder={HOLDERS[currentHolderIndex]}
            recipientName={recipientName}
            messageBody={messageBody}
            fromName={fromName}
            layoutType={layoutType}
            onBack={() => setCurrentStep("message")}
            onRestart={resetToStart}
          />
        )}
      </main>

      <footer className="mt-8 text-sm text-gray-400">
        Created with &hearts; by @MadeByDianna
      </footer>
    </div>
  );
};

export default App;
