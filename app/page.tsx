"use client";

import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

type FieldInteractionCounts = {
  annualIncome: number;
  taxId: number;
  investmentAmount: number;
  taxCategory: number;
};

export default function Home() {
  // --------------------------------------------------
  // FORM STATES
  // --------------------------------------------------

  const [annualIncome, setAnnualIncome] = useState("");
  const [taxId, setTaxId] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [taxCategory, setTaxCategory] = useState("");

  // --------------------------------------------------
  // MOUSE TRACKING STATES
  // --------------------------------------------------

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const [mouseHistory, setMouseHistory] = useState<MousePosition[]>([]);
  const [movementCount, setMovementCount] = useState(0);
  const [totalMovementDistance, setTotalMovementDistance] = useState(0);

  // --------------------------------------------------
  // INTERACTION STATES
  // --------------------------------------------------

  const [activeField, setActiveField] = useState("None");

  const [fieldInteractions, setFieldInteractions] =
    useState<FieldInteractionCounts>({
      annualIncome: 0,
      taxId: 0,
      investmentAmount: 0,
      taxCategory: 0,
    });

  // --------------------------------------------------
  // HESITATION STATES
  // --------------------------------------------------

  const [hesitationSeconds, setHesitationSeconds] = useState(0);
  const [isHesitating, setIsHesitating] = useState(false);

  // --------------------------------------------------
  // FORM SUBMISSION STATE
  // --------------------------------------------------

  const [message, setMessage] = useState("");

  // --------------------------------------------------
  // SIMPLIFIED FORM STATE
  // --------------------------------------------------

  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  // --------------------------------------------------
  // MOUSE MOVEMENT TRACKING
  // --------------------------------------------------

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      setMousePosition(newPosition);

      setMouseHistory((previousHistory) => {
        const updatedHistory = [...previousHistory, newPosition];

        // Keep only the latest 5 mouse positions
        return updatedHistory.slice(-5);
      });

      setMovementCount((previousCount) => previousCount + 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // --------------------------------------------------
  // MOVEMENT DISTANCE CALCULATION
  // --------------------------------------------------

  useEffect(() => {
    if (mouseHistory.length < 2) {
      return;
    }

    const previousPosition = mouseHistory[mouseHistory.length - 2];
    const currentPosition = mouseHistory[mouseHistory.length - 1];

    const distance = Math.sqrt(
      Math.pow(currentPosition.x - previousPosition.x, 2) +
        Math.pow(currentPosition.y - previousPosition.y, 2)
    );

    setTotalMovementDistance((previousDistance) => {
      return previousDistance + distance;
    });
  }, [mouseHistory]);

  // --------------------------------------------------
  // HESITATION DETECTION
  // --------------------------------------------------

  useEffect(() => {
    const hesitationTimer = setInterval(() => {
      setHesitationSeconds((previousSeconds) => {
        if (previousSeconds >= 2) {
          setIsHesitating(true);
        }

        return previousSeconds + 1;
      });
    }, 1000);

    return () => {
      clearInterval(hesitationTimer);
    };
  }, []);

  // --------------------------------------------------
  // FIELD FOCUS HANDLER
  // --------------------------------------------------

  const handleFieldFocus = (fieldName: keyof FieldInteractionCounts) => {
    setActiveField(fieldName);

    setFieldInteractions((previousInteractions) => ({
      ...previousInteractions,
      [fieldName]: previousInteractions[fieldName] + 1,
    }));

    // Reset hesitation when the user interacts with a field
    setHesitationSeconds(0);
    setIsHesitating(false);
  };

  // --------------------------------------------------
  // FORM SUBMIT HANDLER
  // --------------------------------------------------

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage(
      "Form submitted successfully. AuraGen has recorded the interaction data."
    );
  };

  // --------------------------------------------------
  // MOVEMENT ANALYSIS
  // --------------------------------------------------

  const averageMovementDistance =
    movementCount > 0 ? totalMovementDistance / movementCount : 0;

  let movementStatus = "Stable";

  if (averageMovementDistance > 50) {
    movementStatus = "High Movement";
  } else if (averageMovementDistance > 20) {
    movementStatus = "Moderate Movement";
  }

  // --------------------------------------------------
  // FRICTION SCORE
  // --------------------------------------------------

  const frictionScore = Math.min(
    Math.round(
      movementCount * 0.2 +
        averageMovementDistance * 0.3 +
        (isHesitating ? 20 : 0)
    ),
    100
  );

  let frictionStatus = "Low";

  if (frictionScore >= 60) {
    frictionStatus = "High";
  } else if (frictionScore >= 30) {
    frictionStatus = "Medium";
  }

  // --------------------------------------------------
  // COGNITIVE LOAD SCORE
  // --------------------------------------------------

  const totalFieldInteractions = Object.values(fieldInteractions).reduce(
    (total, count) => total + count,
    0
  );

  const hesitationScore = Math.min(hesitationSeconds * 10, 30);

  const interactionScore = Math.min(totalFieldInteractions * 2, 30);

  const movementScore = Math.min(movementCount * 0.5, 20);

  const cognitiveLoadScore = Math.min(
    Math.round(hesitationScore + interactionScore + movementScore),
    100
  );

  let cognitiveLoadStatus = "Low";

  if (cognitiveLoadScore >= 60) {
    cognitiveLoadStatus = "High";
  } else if (cognitiveLoadScore >= 30) {
    cognitiveLoadStatus = "Medium";
  }

  // --------------------------------------------------
  // SELF-HEALING UI LOGIC
  // --------------------------------------------------

  const isHighCognitiveLoad = cognitiveLoadStatus === "High";
  const isMediumCognitiveLoad = cognitiveLoadStatus === "Medium";

  const shouldSimplifyForm = cognitiveLoadStatus === "High";

  // --------------------------------------------------
  // AURAGEN DECISION ENGINE
  // --------------------------------------------------

  let adaptationAction = "NORMAL_MODE";

  if (cognitiveLoadStatus === "Medium") {
    adaptationAction = "SHOW_GUIDANCE";
  }

  if (cognitiveLoadStatus === "High") {
    adaptationAction = "SIMPLIFY_FORM";
  }

  // --------------------------------------------------
  // DYNAMIC FORM STYLES
  // --------------------------------------------------

  const formSectionStyle = {
    padding: isHighCognitiveLoad
      ? "25px"
      : isMediumCognitiveLoad
      ? "20px"
      : "15px",

    border: isHighCognitiveLoad
      ? "3px solid #dc2626"
      : isMediumCognitiveLoad
      ? "2px solid #f59e0b"
      : "1px solid #d1d5db",

    borderRadius: "10px",

    background: isHighCognitiveLoad
      ? "#fff1f2"
      : isMediumCognitiveLoad
      ? "#fffbeb"
      : "#ffffff",

    transition: "all 0.3s ease",
  };

  const inputStyle = (fieldName: string) => {
    const isActive = activeField === fieldName;

    return {
      width: "100%",
      padding: "12px",
      marginTop: "6px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: isActive ? "3px solid #2563eb" : "1px solid #9ca3af",
      background: isActive ? "#eff6ff" : "#ffffff",
      color: "#222222",
      outline: "none",
    };
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#f5f7fb",
        color: "#222222",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        {/* -------------------------------------------------- */}
        {/* PROJECT HEADER */}
        {/* -------------------------------------------------- */}

        <section
          style={{
            marginBottom: "25px",
            padding: "25px",
            borderRadius: "12px",
            background: "#111827",
            color: "#ffffff",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#ffffff",
            }}
          >
            AuraGen
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#e5e7eb",
              marginBottom: "8px",
            }}
          >
            Self-Healing Generative UI via Cognitive Load
          </p>

          <p
            style={{
              fontSize: "14px",
              color: "#d1d5db",
            }}
          >
            Infotact Solutions Internship Project
          </p>
        </section>

        {/* -------------------------------------------------- */}
        {/* COGNITIVE LOAD MESSAGE */}
        {/* -------------------------------------------------- */}

        {isHighCognitiveLoad && (
          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#fee2e2",
              border: "2px solid #dc2626",
              color: "#991b1b",
            }}
          >
            <strong>⚠️ High Cognitive Load Detected</strong>

            <p style={{ marginTop: "8px" }}>
              AuraGen has activated Simplified Form Mode to reduce user effort.
            </p>
          </div>
        )}

        {isMediumCognitiveLoad && (
          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#fef3c7",
              border: "2px solid #f59e0b",
              color: "#92400e",
            }}
          >
            <strong>💡 Guidance Mode Activated</strong>

            <p style={{ marginTop: "8px" }}>
              Take your time. Complete the fields one by one.
            </p>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* FINANCIAL INFORMATION FORM */}
        {/* -------------------------------------------------- */}

        <section style={formSectionStyle}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            Financial Information Form
          </h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="annualIncome">
              Annual Income
            </label>

            <input
              id="annualIncome"
              type="number"
              placeholder="Enter your annual income"
              value={annualIncome}
              onFocus={() => handleFieldFocus("annualIncome")}
              onChange={(event) => setAnnualIncome(event.target.value)}
              style={inputStyle("annualIncome")}
            />

            <label htmlFor="taxId">
              Tax Identification Number
            </label>

            <input
              id="taxId"
              type="text"
              placeholder="Enter your tax identification number"
              value={taxId}
              onFocus={() => handleFieldFocus("taxId")}
              onChange={(event) => setTaxId(event.target.value)}
              style={inputStyle("taxId")}
            />

            {/* ADVANCED FIELDS */}

            {(!shouldSimplifyForm || showAdvancedFields) && (
              <>
                <label htmlFor="investmentAmount">
                  Investment Amount
                </label>

                <input
                  id="investmentAmount"
                  type="number"
                  placeholder="Enter your investment amount"
                  value={investmentAmount}
                  onFocus={() => handleFieldFocus("investmentAmount")}
                  onChange={(event) =>
                    setInvestmentAmount(event.target.value)
                  }
                  style={inputStyle("investmentAmount")}
                />

                <label htmlFor="taxCategory">
                  Tax Category
                </label>

                <select
                  id="taxCategory"
                  value={taxCategory}
                  onFocus={() => handleFieldFocus("taxCategory")}
                  onChange={(event) => setTaxCategory(event.target.value)}
                  style={inputStyle("taxCategory")}
                >
                  <option value="">Select tax category</option>
                  <option value="Individual">Individual</option>
                  <option value="Business">Business</option>
                  <option value="Professional">Professional</option>
                </select>
              </>
            )}

            {/* SIMPLIFIED FORM CONTROLS */}

            {shouldSimplifyForm && !showAdvancedFields && (
              <div
                style={{
                  marginBottom: "15px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#dbeafe",
                  border: "1px solid #60a5fa",
                }}
              >
                <strong>Simplified Form Mode</strong>

                <p
                  style={{
                    marginTop: "6px",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  Advanced fields are temporarily hidden to reduce cognitive
                  load.
                </p>

                <button
                  type="button"
                  onClick={() => setShowAdvancedFields(true)}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#2563eb",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Show All Fields
                </button>
              </div>
            )}

            {shouldSimplifyForm && showAdvancedFields && (
              <button
                type="button"
                onClick={() => setShowAdvancedFields(false)}
                style={{
                  marginBottom: "15px",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#6b7280",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                Use Simplified Form
              </button>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: isHighCognitiveLoad ? "16px" : "12px",
                borderRadius: "7px",
                border: "none",
                background: isHighCognitiveLoad
                  ? "#dc2626"
                  : isMediumCognitiveLoad
                  ? "#d97706"
                  : "#111827",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Submit Financial Information
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "15px",
                padding: "12px",
                borderRadius: "6px",
                background: "#dcfce7",
                border: "1px solid #22c55e",
                color: "#166534",
              }}
            >
              {message}
            </p>
          )}
        </section>

        {/* -------------------------------------------------- */}
        {/* AURAGEN TELEMETRY DASHBOARD */}
        {/* -------------------------------------------------- */}

        <section
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "10px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            AuraGen Telemetry Dashboard
          </h2>

          {/* MOUSE POSITION */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong>🖱️ Current Mouse Position</strong>

            <p>
              X Position: {mousePosition.x}px
            </p>

            <p>
              Y Position: {mousePosition.y}px
            </p>
          </div>

          {/* ACTIVE FIELD */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong>🎯 Active Field</strong>

            <p>{activeField}</p>
          </div>

          {/* FIELD INTERACTIONS */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong>📊 Field Interaction Counters</strong>

            <p>
              Annual Income: {fieldInteractions.annualIncome}
            </p>

            <p>
              Tax ID: {fieldInteractions.taxId}
            </p>

            <p>
              Investment Amount: {fieldInteractions.investmentAmount}
            </p>

            <p>
              Tax Category: {fieldInteractions.taxCategory}
            </p>

            <p>
              Total Interactions: {totalFieldInteractions}
            </p>
          </div>

          {/* MOVEMENT ANALYSIS */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong>📈 Movement Analysis</strong>

            <p>
              Movement Count: {movementCount}
            </p>

            <p>
              Total Movement Distance:{" "}
              {Math.round(totalMovementDistance)}px
            </p>

            <p>
              Average Movement Distance:{" "}
              {Math.round(averageMovementDistance)}px
            </p>

            <p>
              Movement Status: {movementStatus}
            </p>
          </div>

          {/* FRICTION SCORE */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong>⚙️ Friction Score</strong>

            <p>
              Score: {frictionScore}/100
            </p>

            <p>
              Status: {frictionStatus}
            </p>
          </div>

          {/* HESITATION DETECTION */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong>⏱️ Hesitation Detection</strong>

            <p>
              Hesitation Time: {hesitationSeconds} seconds
            </p>

            <p>
              Hesitation Status:{" "}
              {isHesitating ? "Hesitation Detected" : "Normal"}
            </p>
          </div>

          {/* COGNITIVE LOAD */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background:
                cognitiveLoadStatus === "High"
                  ? "#fee2e2"
                  : cognitiveLoadStatus === "Medium"
                  ? "#fef3c7"
                  : "#dcfce7",
              border:
                cognitiveLoadStatus === "High"
                  ? "2px solid #dc2626"
                  : cognitiveLoadStatus === "Medium"
                  ? "2px solid #f59e0b"
                  : "2px solid #22c55e",
            }}
          >
            <strong>🧠 Cognitive Load Score</strong>

            <p>
              Score: {cognitiveLoadScore}/100
            </p>

            <p>
              Status: {cognitiveLoadStatus}
            </p>

            <p style={{ fontSize: "13px" }}>
              The score is calculated using hesitation, field interactions,
              and mouse movement.
            </p>
          </div>

          {/* AURAGEN DECISION ENGINE */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#eef6ff",
              border: "1px solid #93c5fd",
            }}
          >
            <strong>🤖 AuraGen Decision Engine</strong>

            <p style={{ marginTop: "8px" }}>
              Current Action:
              <br />
              <strong>{adaptationAction}</strong>
            </p>

            <p
              style={{
                fontSize: "13px",
                color: "#1e3a8a",
              }}
            >
              The decision engine selects an interface adaptation based on
              cognitive load.
            </p>
          </div>

          {/* DECISION EXPLANATION */}

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
            }}
          >
            <strong>📘 Decision Explanation</strong>

            {adaptationAction === "NORMAL_MODE" && (
              <p style={{ marginTop: "8px" }}>
                Cognitive load is low. The normal form is displayed.
              </p>
            )}

            {adaptationAction === "SHOW_GUIDANCE" && (
              <p style={{ marginTop: "8px" }}>
                Cognitive load is medium. Helpful guidance is displayed.
              </p>
            )}

            {adaptationAction === "SIMPLIFY_FORM" && (
              <p style={{ marginTop: "8px" }}>
                Cognitive load is high. Advanced fields are temporarily hidden
                to reduce user effort.
              </p>
            )}
          </div>

          {/* MOUSE HISTORY */}

          <div
            style={{
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          >
            <strong>🗂️ Recent Mouse Movement History</strong>

            {mouseHistory.length === 0 ? (
              <p>No mouse movement recorded yet.</p>
            ) : (
              mouseHistory.map((position, index) => (
                <p key={index}>
                  Position {index + 1}: X={position.x}, Y={position.y}
                </p>
              ))
            )}
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* PROJECT FOOTER */}
        {/* -------------------------------------------------- */}

        <footer
          style={{
            marginTop: "25px",
            padding: "15px",
            textAlign: "center",
            fontSize: "13px",
            color: "#4b5563",
          }}
        >
          AuraGen | Cognitive Load-Aware Self-Healing Generative UI
        </footer>
      </div>
    </main>
  );
}