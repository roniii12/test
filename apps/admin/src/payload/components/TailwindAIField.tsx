"use client";

import React, { useState } from "react";
import { useField } from "@payloadcms/ui";
import type { TextFieldClientProps } from "payload";

export const TailwindAIField: React.FC<TextFieldClientProps> = ({ field }) => {
  const { value, setValue } = useField<string>({ path: field.name });
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    if (!prompt) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/generate-tailwind", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate classes");
      }

      const data = await response.json();
      if (data.classes) {
        // Append or replace? Let's append if there are existing classes
        const existingClasses = typeof value === "string" ? value : "";
        setValue(
          existingClasses ? `${existingClasses} ${data.classes}` : data.classes
        );
        setPrompt(""); // Clear the prompt after success
      }
    } catch (error) {
      console.error(error);
      alert("Error generating Tailwind classes. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          position: "relative",
          zIndex: 1,
        }}
        className="field-label"
      >
        {"Custom Tailwind Classes"}
      </label>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. bold blue text on a rounded white background with shadow"
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid var(--theme-elevation-150)",
            borderRadius: "4px",
            background: "var(--theme-elevation-50)",
            color: "var(--theme-elevation-800)",
          }}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleAskAI}
          disabled={isLoading}
          style={{
            padding: "8px 16px",
            background: "var(--theme-success-500)",
            color: "var(--theme-elevation-0)",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Generating..." : "Ask AI ✨"}
        </button>
      </div>
      <input
        type="text"
        value={(value as string) || ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Standard classes applied here (e.g. text-blue-500 rounded-lg)"
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid var(--theme-elevation-150)",
          borderRadius: "4px",
          background: "var(--theme-elevation-50)",
          color: "var(--theme-elevation-800)",
        }}
      />
      {field.admin?.description && (
        <div
          style={{ marginTop: "4px", fontSize: "13px", color: "var(--theme-elevation-400)" }}
        >
          {field.admin.description as string}
        </div>
      )}
    </div>
  );
};
