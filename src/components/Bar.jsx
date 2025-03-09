import React, { useState } from "react";
import Airdrop from "./Airdrop";
import SendSOL from "./SendSOL";

const Bar = () => {
  const [activeCard, setActiveCard] = useState(null);

  // Define buttons and their corresponding components
  const buttons = [
    { label: "Airdrop SOL", value: "Airdrop", component: <Airdrop /> },
    {
      label: "Send SOL",
      value: "Send SOL",
      component: <SendSOL />,
    },
    {
      label: "Create Token",
      value: "Create Token",
      component: <div>Create Token Component</div>,
    },
    {
      label: "Liquidity Pool",
      value: "Liquidity Pool",
      component: <div>Liquidity Pool Component</div>,
    },
  ];

  return (
    <div>
      {/* Bar Section */}
      <div className="bg-gray-900 py-4 shadow-md">
        <div className="container mx-auto flex justify-center space-x-6">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveCard(btn.value)}
              className="px-6 py-2 text-gray-200 font-semibold rounded-full border border-gray-600 hover:bg-gray-700 hover:text-white transition duration-300"
            >
              {btn.label}
            </button>
          ))}
          <div>
            {/* Close button to reset active card */}
            {activeCard && (
              <button
                onClick={() => setActiveCard(null)}
                className="relative px-2 py-2 text-white bg-gray-900 rounded-full hover:bg-gray-700"
              >
                ❌
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Render Selected Component Below the Bar */}
      <div className="relative mt-6 container mx-auto">
        {activeCard && (
          <div className="flex justify-center items-center mb-4">
            {/* Find and render the active component */}
            {buttons.find((btn) => btn.value === activeCard)?.component}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bar;
