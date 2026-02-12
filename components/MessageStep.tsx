import React from "react";

interface MessageStepProps {
  recipientName: string;
  setRecipientName: (v: string) => void;

  messageBody: string;
  setMessageBody: (v: string) => void;

  fromName: string;
  setFromName: (v: string) => void;

  onBack: () => void;
  onNext: () => void;
}

const MessageStep: React.FC<MessageStepProps> = ({
  recipientName,
  setRecipientName,
  messageBody,
  setMessageBody,
  fromName,
  setFromName,
  onBack,
  onNext,
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center animate-fadeIn bg-[#f3f0e6]">
      {/* Header (match ShareStep / ArrangementStep) */}
      <div className="mt-14 mb-6 px-4">
        <div className="text-5xl font-cursive font-bold text-gray-900">
          BloomNotes
        </div>

        <div className="mt-6 text-sm font-bold tracking-[0.2em] text-gray-900">
          WRITE YOUR MESSAGE
        </div>

        <p className="mt-1 text-gray-500">
          This note will be included with your bouquet.
        </p>
      </div>

      {/* Main container (same width rules) */}
      <div className="w-full max-w-7xl px-4 sm:px-6">
        {/* Card (match ShareStep letter card vibe) */}
        <div className="mx-auto w-full max-w-[760px] flex justify-center">
          <div className="w-full max-w-[600px] bg-white shadow-xl border border-gray-300 px-8 py-8 text-left">
            {/* Recipient */}
            <div className="mb-8">
              <label className="block text-xs font-bold tracking-widest text-gray-600 mb-2 uppercase">
                Who is this for
              </label>
              <input
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="First Name or Nickname"
                className="w-full px-4 py-4 rounded-md border border-gray-400 bg-white text-sm text-gray-800 outline-none focus:ring-0 focus:border-gray-500"
              />
            </div>

            {/* Message */}
            <div className="mb-5">
              <label className="block text-xs font-bold tracking-widest text-gray-600 mb-2 uppercase">
                Message
              </label>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Write your note here..."
                className="w-full min-h-[200px] px-4 py-3 rounded-md border border-gray-400 bg-white text-sm text-gray-800 outline-none focus:ring-0 focus:border-gray-500 resize-none whitespace-pre-line"
              />
            </div>

            {/* From */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-600 mb-2 uppercase">
                From
              </label>
              <input
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-4 rounded-md border border-gray-400 bg-white text-sm text-gray-800 outline-none focus:ring-0 focus:border-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Buttons (match ShareStep button styling) */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-12 py-3 rounded-md font-bold tracking-widest uppercase border border-gray-400 text-gray-700 hover:bg-white/60 transition-colors"
            type="button"
          >
            Back
          </button>

          <button
            onClick={onNext}
            className="px-10 py-3 rounded-md font-bold tracking-widest uppercase bg-black text-white hover:opacity-90 transition-opacity"
            type="button"
          >
            Preview &amp; Send
          </button>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
};

export default MessageStep;
