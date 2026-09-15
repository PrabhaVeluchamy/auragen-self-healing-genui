"use client";

import { useState } from "react";

export default function Home() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [taxId, setTaxId] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [taxCategory, setTaxCategory] = useState("");

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormSubmitted(true);

    console.log("Financial Information Submitted:", {
      annualIncome,
      taxId,
      investmentAmount,
      taxCategory,
    });
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gray-100 px-6 py-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700">
            AuraGen Financial Information Form
          </h1>

          <p className="mt-2 text-gray-600">
            Self-Healing Generative UI using Cognitive Load
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Financial Form */}
          <section className="rounded-xl bg-white p-6 shadow-md md:col-span-2">
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

          {/* Mouse Tracking Panel */}
          <aside className="rounded-xl bg-gray-900 p-6 text-white shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              Interaction Telemetry
            </h2>

            <p className="mb-4 text-sm text-gray-300">
              Move your mouse inside the application.
            </p>

            <div className="space-y-3">
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

            <div className="mt-5 rounded-lg bg-blue-600 p-3 text-sm">
              Tracking status: Active
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}