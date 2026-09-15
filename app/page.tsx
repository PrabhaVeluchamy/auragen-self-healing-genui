"use client";

import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

export default function Home() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [taxId, setTaxId] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [taxCategory, setTaxCategory] = useState("");

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const [movementHistory, setMovementHistory] = useState<
    MousePosition[]
  >([]);

  const [lastMovementTime, setLastMovementTime] = useState<number>(
    Date.now()
  );

  const [hesitationSeconds, setHesitationSeconds] = useState(0);

  const [isHesitating, setIsHesitating] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const newPosition: MousePosition = {
      x: event.clientX,
      y: event.clientY,
    };

    setMousePosition(newPosition);

    setMovementHistory((previousHistory) => {
      const updatedHistory = [
        ...previousHistory,
        newPosition,
      ];

      return updatedHistory.slice(-5);
    });

    // Reset the hesitation timer
    setLastMovementTime(Date.now());
    setHesitationSeconds(0);
    setIsHesitating(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Math.floor(
        (Date.now() - lastMovementTime) / 1000
      );

      setHesitationSeconds(elapsedTime);

      if (elapsedTime >= 2) {
        setIsHesitating(true);
      } else {
        setIsHesitating(false);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [lastMovementTime]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormSubmitted(true);

    console.log("Financial Information Submitted:", {
      annualIncome,
      taxId,
      investmentAmount,
      taxCategory,
    });
  };

  const movementCount = movementHistory.length;

  let movementDistance = 0;

  for (let index = 1; index < movementHistory.length; index++) {
    const previousPoint = movementHistory[index - 1];
    const currentPoint = movementHistory[index];

    const xDifference = currentPoint.x - previousPoint.x;
    const yDifference = currentPoint.y - previousPoint.y;

    const distance = Math.sqrt(
      xDifference * xDifference +
        yDifference * yDifference
    );

    movementDistance += distance;
  }

  const frictionScore = Math.min(
    100,
    Math.round(
      movementCount * 10 + movementDistance / 20
    )
  );

  let frictionStatus = "Low Friction";
  let frictionColor = "bg-green-600";

  if (frictionScore >= 70) {
    frictionStatus = "High Friction";
    frictionColor = "bg-red-600";
  } else if (frictionScore >= 40) {
    frictionStatus = "Medium Friction";
    frictionColor = "bg-yellow-500";
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gray-100 px-6 py-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700">
            AuraGen Financial Information Form
          </h1>

          <p className="mt-2 text-gray-600">
            Self-Healing Generative UI using Cognitive Load
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Financial Form */}
          <section className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
              Financial Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="annualIncome"
                  className="mb-1 block font-medium text-gray-700"
                >
                  Annual Income
                </label>

                <input
                  id="annualIncome"
                  type="number"
                  value={annualIncome}
                  onChange={(event) =>
                    setAnnualIncome(event.target.value)
                  }
                  placeholder="Enter annual income"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="taxId"
                  className="mb-1 block font-medium text-gray-700"
                >
                  Tax Identification Number
                </label>

                <input
                  id="taxId"
                  type="text"
                  value={taxId}
                  onChange={(event) => setTaxId(event.target.value)}
                  placeholder="Enter tax ID"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="investmentAmount"
                  className="mb-1 block font-medium text-gray-700"
                >
                  Investment Amount
                </label>

                <input
                  id="investmentAmount"
                  type="number"
                  value={investmentAmount}
                  onChange={(event) =>
                    setInvestmentAmount(event.target.value)
                  }
                  placeholder="Enter investment amount"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="taxCategory"
                  className="mb-1 block font-medium text-gray-700"
                >
                  Tax Category
                </label>

                <select
                  id="taxCategory"
                  value={taxCategory}
                  onChange={(event) =>
                    setTaxCategory(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select tax category</option>
                  <option value="Individual">Individual</option>
                  <option value="Business">Business</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Submit Financial Information
              </button>
            </form>

            {formSubmitted && (
              <div className="mt-4 rounded-lg bg-green-100 p-3 text-green-700">
                Financial information submitted successfully.
              </div>
            )}
          </section>

          {/* Telemetry Panel */}
          <aside className="rounded-xl bg-gray-900 p-6 text-white shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              Interaction Telemetry
            </h2>

            <p className="mb-4 text-sm text-gray-300">
              Move your mouse and then pause.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">Mouse X</p>

                <p className="text-2xl font-bold">
                  {mousePosition.x}px
                </p>
              </div>

              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">Mouse Y</p>

                <p className="text-2xl font-bold">
                  {mousePosition.y}px
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">
                  Movement Count
                </p>

                <p className="text-2xl font-bold">
                  {movementCount}
                </p>
              </div>

              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">
                  Movement Distance
                </p>

                <p className="text-2xl font-bold">
                  {Math.round(movementDistance)}px
                </p>
              </div>

              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">
                  Friction Score
                </p>

                <p className="text-3xl font-bold">
                  {frictionScore}/100
                </p>
              </div>

              <div
                className={`rounded-lg p-3 text-center font-semibold ${frictionColor}`}
              >
                {frictionStatus}
              </div>

              {/* Hesitation Analysis */}
              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">
                  Pause Duration
                </p>

                <p className="text-2xl font-bold">
                  {hesitationSeconds}s
                </p>
              </div>

              <div
                className={`rounded-lg p-3 text-center font-semibold ${
                  isHesitating
                    ? "bg-orange-500"
                    : "bg-green-600"
                }`}
              >
                {isHesitating
                  ? "Possible Hesitation Detected"
                  : "Normal Interaction"}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="mb-3 text-lg font-semibold">
                Recent Movement History
              </h3>

              {movementHistory.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No movement recorded yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {movementHistory.map((position, index) => (
                    <div
                      key={`${position.x}-${position.y}-${index}`}
                      className="rounded-lg bg-gray-800 px-3 py-2 text-sm"
                    >
                      <span className="text-gray-400">
                        Position {index + 1}:
                      </span>{" "}
                      X={position.x}, Y={position.y}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 rounded-lg bg-blue-600 p-3 text-sm">
              Tracking status: Active
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}