"use client";

import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

type FieldInteractionCounts = {
  "Annual Income": number;
  "Tax ID": number;
  "Investment Amount": number;
  "Tax Category": number;
  "Submit Button": number;
};

export default function Home() {
  // ============================================
  // FORM STATES
  // ============================================

  const [annualIncome, setAnnualIncome] = useState("");
  const [taxId, setTaxId] = useState("");
  const [investmentAmount, setInvestmentAmount] =
    useState("");
  const [taxCategory, setTaxCategory] = useState("");

  // ============================================
  // MOUSE TRACKING
  // ============================================

  const [mousePosition, setMousePosition] =
    useState<MousePosition>({
      x: 0,
      y: 0,
    });

  const [movementHistory, setMovementHistory] =
    useState<MousePosition[]>([]);

  const [movementCount, setMovementCount] = useState(0);

  const [movementDistance, setMovementDistance] =
    useState(0);

  // ============================================
  // HESITATION DETECTION
  // ============================================

  const [lastMovementTime, setLastMovementTime] =
    useState(Date.now());

  const [hesitationSeconds, setHesitationSeconds] =
    useState(0);

  const [isHesitating, setIsHesitating] =
    useState(false);

  // ============================================
  // ACTIVE FIELD TRACKING
  // ============================================

  const [activeField, setActiveField] =
    useState("None");

  // ============================================
  // FIELD INTERACTION COUNTERS
  // ============================================

  const [fieldInteractions, setFieldInteractions] =
    useState<FieldInteractionCounts>({
      "Annual Income": 0,
      "Tax ID": 0,
      "Investment Amount": 0,
      "Tax Category": 0,
      "Submit Button": 0,
    });

  // ============================================
  // FORM SUBMISSION
  // ============================================

  const [formSubmitted, setFormSubmitted] =
    useState(false);

  // ============================================
  // ADAPTIVE UI STATE
  // ============================================

  const [showAdvancedFields, setShowAdvancedFields] =
    useState(false);

  // ============================================
  // FIELD FOCUS HANDLER
  // ============================================

  const handleFieldFocus = (fieldName: string) => {
    setActiveField(fieldName);

    setFieldInteractions((previousInteractions) => {
      const typedFieldName =
        fieldName as keyof FieldInteractionCounts;

      return {
        ...previousInteractions,
        [typedFieldName]:
          previousInteractions[typedFieldName] + 1,
      };
    });
  };

  // ============================================
  // MOUSE MOVEMENT HANDLER
  // ============================================

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const newPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    const previousPosition = mousePosition;

    const distance = Math.sqrt(
      Math.pow(
        newPosition.x - previousPosition.x,
        2
      ) +
        Math.pow(
          newPosition.y - previousPosition.y,
          2
        )
    );

    setMovementDistance(
      (previousDistance) =>
        previousDistance + distance
    );

    setMousePosition(newPosition);

    setMovementCount(
      (previousCount) =>
        previousCount + 1
    );

    setMovementHistory((previousHistory) => {
      const updatedHistory = [
        ...previousHistory,
        newPosition,
      ];

      return updatedHistory.slice(-5);
    });

    setLastMovementTime(Date.now());
    setHesitationSeconds(0);
    setIsHesitating(false);
  };

  // ============================================
  // HESITATION TIMER
  // ============================================

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed =
        (Date.now() - lastMovementTime) / 1000;

      setHesitationSeconds(Math.round(elapsed));

      setIsHesitating(elapsed >= 2);
    }, 500);

    return () => clearInterval(interval);
  }, [lastMovementTime]);

  // ============================================
  // FRICTION SCORE
  // ============================================

  const frictionScore = Math.min(
    Math.round(
      movementCount * 0.2 +
        hesitationSeconds * 2
    ),
    100
  );

  let frictionStatus = "Low";

  if (frictionScore >= 60) {
    frictionStatus = "High";
  } else if (frictionScore >= 30) {
    frictionStatus = "Medium";
  }

  // ============================================
  // COGNITIVE LOAD SCORE
  // ============================================

  const totalFieldInteractions =
    Object.values(fieldInteractions).reduce(
      (total, count) => total + count,
      0
    );

  const hesitationScore = Math.min(
    hesitationSeconds * 10,
    30
  );

  const interactionScore = Math.min(
    totalFieldInteractions * 2,
    30
  );

  const movementScore = Math.min(
    movementCount * 0.5,
    20
  );

  const cognitiveLoadScore = Math.min(
    Math.round(
      hesitationScore +
        interactionScore +
        movementScore
    ),
    100
  );

  let cognitiveLoadStatus = "Low";

  if (cognitiveLoadScore >= 60) {
    cognitiveLoadStatus = "High";
  } else if (cognitiveLoadScore >= 30) {
    cognitiveLoadStatus = "Medium";
  }

  // ============================================
  // SELF-HEALING UI CONDITIONS
  // ============================================

  const isHighCognitiveLoad =
    cognitiveLoadStatus === "High";

  const isMediumCognitiveLoad =
    cognitiveLoadStatus === "Medium";

  const shouldSimplifyForm =
    cognitiveLoadStatus === "High";

  // ============================================
  // ADAPTIVE FORM STYLE
  // ============================================

  const formSectionStyle = {
    background: isHighCognitiveLoad
      ? "#fff4f4"
      : "white",

    padding: isHighCognitiveLoad
      ? "40px"
      : isMediumCognitiveLoad
      ? "35px"
      : "30px",

    borderRadius: "12px",

    border: isHighCognitiveLoad
      ? "3px solid #e57373"
      : isMediumCognitiveLoad
      ? "2px solid #f0c36d"
      : "1px solid #eeeeee",

    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",

    transition: "all 0.3s ease",
  };

  const inputStyle = (
    fieldName: string
  ) => ({
    width: "100%",

    padding: isHighCognitiveLoad
      ? "16px"
      : isMediumCognitiveLoad
      ? "14px"
      : "12px",

    borderRadius: "6px",

    border:
      activeField === fieldName
        ? "3px solid #2563eb"
        : "1px solid #cccccc",

    background:
      activeField === fieldName
        ? "#eff6ff"
        : "white",

    color: "#222222",

    fontSize: isHighCognitiveLoad
      ? "17px"
      : "16px",

    transition: "all 0.2s ease",
  });

  // ============================================
  // FORM SUBMIT HANDLER
  // ============================================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormSubmitted(true);

    console.log("AuraGen Form Submitted");

    console.log({
      annualIncome,
      taxId,
      investmentAmount,
      taxCategory,
      mousePosition,
      movementCount,
      movementDistance,
      hesitationSeconds,
      activeField,
      fieldInteractions,
      frictionScore,
      cognitiveLoadScore,
      cognitiveLoadStatus,
      showAdvancedFields,
    });
  };

  // ============================================
  // PAGE UI
  // ============================================

  return (
    <main
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        color: "#222222",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <h1
          style={{
            fontSize: "32px",
            marginBottom: "8px",
            color: "#222222",
          }}
        >
          AuraGen
        </h1>

        <p
          style={{
            color: "#555555",
            marginBottom: "30px",
          }}
        >
          Self-Healing Generative UI via Cognitive Load
        </p>

        {/* MAIN GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {/* FINANCIAL FORM */}

          <section style={formSectionStyle}>
            <h2
              style={{
                marginBottom: "20px",
                color: "#222222",
              }}
            >
              Financial Information
            </h2>

            {/* HIGH LOAD MESSAGE */}

            {isHighCognitiveLoad && (
              <div
                style={{
                  background: "#ffe0e0",
                  color: "#8b0000",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  lineHeight: "1.6",
                }}
              >
                🧠 AuraGen detected high cognitive load.
                <br />
                Take your time. The form has been
                simplified.
              </div>
            )}

            {/* MEDIUM LOAD MESSAGE */}

            {isMediumCognitiveLoad && (
              <div
                style={{
                  background: "#fff3cd",
                  color: "#856404",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  lineHeight: "1.6",
                }}
              >
                💡 Need help? Complete one field at a
                time.
              </div>
            )}

            {/* SIMPLIFIED FORM MESSAGE */}

            {shouldSimplifyForm &&
              !showAdvancedFields && (
                <div
                  style={{
                    background: "#eef6ff",
                    border: "1px solid #93c5fd",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    color: "#1e3a8a",
                  }}
                >
                  <strong>
                    ✨ Simplified Form Mode
                  </strong>

                  <p>
                    AuraGen is showing the essential
                    fields first to reduce cognitive
                    load.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setShowAdvancedFields(true)
                    }
                    style={{
                      padding: "10px 14px",
                      border: "none",
                      borderRadius: "6px",
                      background: "#2563eb",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Show All Fields
                  </button>
                </div>
              )}

            {/* RESTORE SIMPLIFIED MODE BUTTON */}

            {shouldSimplifyForm &&
              showAdvancedFields && (
                <button
                  type="button"
                  onClick={() =>
                    setShowAdvancedFields(false)
                  }
                  style={{
                    marginBottom: "20px",
                    padding: "10px 14px",
                    border: "1px solid #2563eb",
                    borderRadius: "6px",
                    background: "white",
                    color: "#2563eb",
                    cursor: "pointer",
                  }}
                >
                  Use Simplified Form
                </button>
              )}

            <form onSubmit={handleSubmit}>
              {/* ANNUAL INCOME */}

              <div
                style={{
                  marginBottom: isHighCognitiveLoad
                    ? "28px"
                    : "18px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                    color: "#222222",
                  }}
                >
                  Annual Income
                </label>

                <input
                  type="number"
                  value={annualIncome}
                  onChange={(event) =>
                    setAnnualIncome(event.target.value)
                  }
                  onFocus={() =>
                    handleFieldFocus("Annual Income")
                  }
                  onBlur={() => setActiveField("None")}
                  placeholder="Enter annual income"
                  style={inputStyle("Annual Income")}
                />
              </div>

              {/* TAX ID */}

              <div
                style={{
                  marginBottom: isHighCognitiveLoad
                    ? "28px"
                    : "18px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                    color: "#222222",
                  }}
                >
                  Tax ID
                </label>

                <input
                  type="text"
                  value={taxId}
                  onChange={(event) =>
                    setTaxId(event.target.value)
                  }
                  onFocus={() =>
                    handleFieldFocus("Tax ID")
                  }
                  onBlur={() => setActiveField("None")}
                  placeholder="Enter Tax ID"
                  style={inputStyle("Tax ID")}
                />
              </div>

              {/* ADVANCED FIELDS */}

              {(!shouldSimplifyForm ||
                showAdvancedFields) && (
                <>
                  {/* INVESTMENT AMOUNT */}

                  <div
                    style={{
                      marginBottom: isHighCognitiveLoad
                        ? "28px"
                        : "18px",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontWeight: "bold",
                        color: "#222222",
                      }}
                    >
                      Investment Amount
                    </label>

                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(event) =>
                        setInvestmentAmount(
                          event.target.value
                        )
                      }
                      onFocus={() =>
                        handleFieldFocus(
                          "Investment Amount"
                        )
                      }
                      onBlur={() =>
                        setActiveField("None")
                      }
                      placeholder="Enter investment amount"
                      style={inputStyle(
                        "Investment Amount"
                      )}
                    />
                  </div>

                  {/* TAX CATEGORY */}

                  <div
                    style={{
                      marginBottom: isHighCognitiveLoad
                        ? "28px"
                        : "18px",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontWeight: "bold",
                        color: "#222222",
                      }}
                    >
                      Tax Category
                    </label>

                    <select
                      value={taxCategory}
                      onChange={(event) =>
                        setTaxCategory(
                          event.target.value
                        )
                      }
                      onFocus={() =>
                        handleFieldFocus("Tax Category")
                      }
                      onBlur={() =>
                        setActiveField("None")
                      }
                      style={inputStyle("Tax Category")}
                    >
                      <option value="">
                        Select category
                      </option>

                      <option value="Individual">
                        Individual
                      </option>

                      <option value="Business">
                        Business
                      </option>

                      <option value="Corporate">
                        Corporate
                      </option>
                    </select>
                  </div>
                </>
              )}

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                onFocus={() =>
                  handleFieldFocus("Submit Button")
                }
                onBlur={() => setActiveField("None")}
                style={{
                  width: "100%",
                  padding: isHighCognitiveLoad
                    ? "17px"
                    : "13px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                  background: isHighCognitiveLoad
                    ? "#b91c1c"
                    : "#222222",
                  color: "white",
                  transition: "all 0.3s ease",
                }}
              >
                Submit
              </button>

              {/* SUBMISSION MESSAGE */}

              {formSubmitted && (
                <p
                  style={{
                    marginTop: "15px",
                    fontWeight: "bold",
                    color: "#15803d",
                  }}
                >
                  ✅ Form submitted successfully!
                </p>
              )}
            </form>
          </section>

          {/* TELEMETRY PANEL */}

          <section
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              border: "1px solid #eeeeee",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)",
              color: "#222222",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                color: "#222222",
              }}
            >
              AuraGen Telemetry
            </h2>

            {/* MOUSE POSITION */}

            <div style={{ marginBottom: "15px" }}>
              <strong>🖱️ Mouse Position</strong>

              <p>
                X: {mousePosition.x}
                <br />
                Y: {mousePosition.y}
              </p>
            </div>

            {/* ACTIVE FIELD */}

            <div style={{ marginBottom: "15px" }}>
              <strong>📍 Active Field</strong>

              <p>{activeField}</p>
            </div>

            {/* FIELD INTERACTIONS */}

            <div style={{ marginBottom: "15px" }}>
              <strong>🔁 Field Interactions</strong>

              <p>
                Annual Income:{" "}
                {fieldInteractions["Annual Income"]}
                <br />

                Tax ID: {fieldInteractions["Tax ID"]}
                <br />

                Investment Amount:{" "}
                {fieldInteractions["Investment Amount"]}
                <br />

                Tax Category:{" "}
                {fieldInteractions["Tax Category"]}
                <br />

                Submit Button:{" "}
                {fieldInteractions["Submit Button"]}
              </p>
            </div>

            {/* MOVEMENT ANALYSIS */}

            <div style={{ marginBottom: "15px" }}>
              <strong>📊 Movement Analysis</strong>

              <p>
                Movement Count: {movementCount}
                <br />

                Movement Distance:{" "}
                {Math.round(movementDistance)} px
              </p>
            </div>

            {/* FRICTION SCORE */}

            <div style={{ marginBottom: "15px" }}>
              <strong>⚡ Friction Score</strong>

              <p>
                Score: {frictionScore}/100
                <br />

                Status: {frictionStatus}
              </p>
            </div>

            {/* COGNITIVE LOAD */}

            <div
              style={{
                marginBottom: "15px",
                padding: "15px",
                borderRadius: "8px",
                border:
                  isHighCognitiveLoad
                    ? "3px solid #e57373"
                    : isMediumCognitiveLoad
                    ? "2px solid #f0c36d"
                    : "1px solid #dddddd",
                background:
                  isHighCognitiveLoad
                    ? "#fff4f4"
                    : isMediumCognitiveLoad
                    ? "#fffaf0"
                    : "white",
                transition: "all 0.3s ease",
              }}
            >
              <strong>🧠 Cognitive Load</strong>

              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  margin: "10px 0",
                }}
              >
                {cognitiveLoadScore}/100
              </p>

              <p>
                Status:{" "}
                <strong>{cognitiveLoadStatus}</strong>
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "#666666",
                  lineHeight: "1.7",
                }}
              >
                Hesitation: {hesitationScore} points
                <br />
                Interaction: {interactionScore} points
                <br />
                Movement: {movementScore} points
              </p>
            </div>

            {/* HESITATION */}

            <div style={{ marginBottom: "15px" }}>
              <strong>⏸️ Hesitation</strong>

              <p>
                Pause Duration: {hesitationSeconds} seconds
                <br />

                Status:{" "}
                {isHesitating
                  ? "⚠️ Hesitating"
                  : "Active"}
              </p>
            </div>

            {/* MOVEMENT HISTORY */}

            <div style={{ marginBottom: "15px" }}>
              <strong>🕘 Recent Movement History</strong>

              {movementHistory.length === 0 ? (
                <p>No movement recorded yet.</p>
              ) : (
                movementHistory.map(
                  (position, index) => (
                    <p
                      key={index}
                      style={{
                        margin: "5px 0",
                        fontSize: "13px",
                      }}
                    >
                      {index + 1}. X: {position.x}, Y:{" "}
                      {position.y}
                    </p>
                  )
                )
              )}
            </div>

            {/* TRACKING STATUS */}

            <div>
              <strong>🟢 Tracking Status</strong>

              <p>
                AuraGen telemetry tracking is active.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}