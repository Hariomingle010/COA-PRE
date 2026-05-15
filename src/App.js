import { useState } from "react";

const chapters = {
  1: "Ch.1 – Structure of Computers",
  2: "Ch.2 – Register Transfer & Micro-ops",
  3: "Ch.3 – Basic Computer Org & Design",
  4: "Ch.4 – Assembly Language Programming",
  5: "Ch.5 – Microprogrammed Control",
  6: "Ch.6 – Central Processing Unit",
  7: "Ch.7 – Pipeline & Vector Processing",
  8: "Ch.8 – Input-Output Organization",
  9: "Ch.9 – Memory Organization",
  10: "Ch.10 – Computer Arithmetic",
  11: "Ch.11 – Multiprocessors",
};

const papers = ["W2023", "S2024", "W2024", "S2025", "W2025"];

// questions: { topic, ch, marks, freq, papers[] }
const questions3 = [
  { topic: "Address Sequencing in Microprogrammed Control", ch: 5, freq: 4, appeared: ["W2023","W2024","S2025","W2025"] },
  { topic: "Addressing Modes (any 3–4)", ch: 6, freq: 3, appeared: ["W2024","S2025","W2025"] },
  { topic: "RISC vs CISC", ch: 6, freq: 3, appeared: ["W2024","S2025","W2025"] },
  { topic: "Flynn's Classification (+ explain one)", ch: 7, freq: 3, appeared: ["S2024","S2025","W2025"] },
  { topic: "Pipeline Conflicts / Difficulties", ch: 7, freq: 2, appeared: ["W2024","W2025"] },
  { topic: "Tightly vs Loosely Coupled Multiprocessors", ch: 11, freq: 3, appeared: ["W2024","S2024","W2025"] },
  { topic: "Cache Coherence (what & solution)", ch: 11, freq: 2, appeared: ["W2024","W2025"] },
  { topic: "Signed / Fixed-Point Number Representation", ch: 1, freq: 2, appeared: ["W2023","W2024"] },
  { topic: "Block Diagram of Basic Computer", ch: 3, freq: 2, appeared: ["W2023","S2025"] },
  { topic: "Registers of Basic Computer (list)", ch: 3, freq: 2, appeared: ["W2024","S2025"] },
  { topic: "RTL – Register Transfer Language", ch: 2, freq: 2, appeared: ["S2024","S2025"] },
  { topic: "Memory Interleaving", ch: 9, freq: 2, appeared: ["S2024","S2025"] },
  { topic: "RAM / ROM Chip Calculations", ch: 9, freq: 2, appeared: ["W2023","W2023"] },
  { topic: "Daisy Chain Priority Interrupt", ch: 8, freq: 2, appeared: ["W2024","W2025"] },
  { topic: "Source-Initiated Handshaking", ch: 8, freq: 2, appeared: ["W2024","W2025"] },
  { topic: "Differentiate MRI and non-MRI", ch: 3, freq: 1, appeared: ["S2024"] },
  { topic: "Effective Address / BSA / Micro-operation (define)", ch: 3, freq: 1, appeared: ["W2025"] },
  { topic: "Subroutine Call and Return (micro-op)", ch: 4, freq: 1, appeared: ["S2024"] },
  { topic: "SIMD Array Processor", ch: 7, freq: 1, appeared: ["W2024"] },
  { topic: "Associative / Content Addressable Memory", ch: 9, freq: 1, appeared: ["S2024"] },
  { topic: "Various Types of Interrupts", ch: 8, freq: 1, appeared: ["S2025"] },
  { topic: "Characteristics of Multiprocessors", ch: 11, freq: 1, appeared: ["W2025"] },
  { topic: "4-bit Adder-Subtractor Block Diagram", ch: 10, freq: 1, appeared: ["W2024"] },
  { topic: "Control Word in a Processor", ch: 5, freq: 1, appeared: ["W2023"] },
  { topic: "Flags Functionality in Basic Computer", ch: 3, freq: 1, appeared: ["W2024"] },
];

const questions4 = [
  { topic: "Address Sequencing in Microprogrammed Control", ch: 5, freq: 3, appeared: ["W2023","W2024","W2025"] },
  { topic: "Registers of Basic Computer (name/size/function)", ch: 3, freq: 2, appeared: ["W2024","S2025"] },
  { topic: "Instruction Format with Types", ch: 6, freq: 2, appeared: ["S2024","S2025"] },
  { topic: "Addressing Modes (any 4)", ch: 6, freq: 2, appeared: ["S2025","W2025"] },
  { topic: "RISC vs CISC", ch: 6, freq: 2, appeared: ["S2025","W2025"] },
  { topic: "Register Stack vs Memory Stack (differences)", ch: 6, freq: 2, appeared: ["S2024","W2024"] },
  { topic: "Flynn's Classification", ch: 7, freq: 2, appeared: ["S2024","S2025"] },
  { topic: "5-Stage Instruction Pipeline", ch: 7, freq: 1, appeared: ["W2025"] },
  { topic: "Handshaking / Source-Initiated Data Transfer", ch: 8, freq: 2, appeared: ["W2024","W2025"] },
  { topic: "Daisy Chain Priority Interrupt", ch: 8, freq: 2, appeared: ["W2024","W2025"] },
  { topic: "DMA – Direct Memory Access", ch: 8, freq: 1, appeared: ["W2025"] },
  { topic: "Input-Output Processor (IOP)", ch: 8, freq: 1, appeared: ["W2025"] },
  { topic: "Isolated I/O vs Memory Mapped I/O", ch: 8, freq: 1, appeared: ["W2024"] },
  { topic: "Interrupt Cycle Flowchart", ch: 8, freq: 1, appeared: ["S2024"] },
  { topic: "SRAM vs DRAM", ch: 9, freq: 2, appeared: ["W2024","S2024"] },
  { topic: "Cache Memory & Virtual Memory (brief)", ch: 9, freq: 1, appeared: ["S2024"] },
  { topic: "Content Addressable Memory", ch: 9, freq: 1, appeared: ["W2024"] },
  { topic: "Tightly vs Loosely Coupled Multiprocessors", ch: 11, freq: 2, appeared: ["S2024","W2025"] },
  { topic: "Crossbar Switch Interconnection Structure", ch: 11, freq: 1, appeared: ["S2024"] },
  { topic: "Omega Switching Network (8×8)", ch: 11, freq: 1, appeared: ["W2025"] },
  { topic: "Shift Micro-Operations", ch: 2, freq: 2, appeared: ["S2025","W2025"] },
  { topic: "Three-State Bus Buffer", ch: 2, freq: 1, appeared: ["S2025"] },
  { topic: "Instruction Cycle Phases", ch: 3, freq: 1, appeared: ["S2025"] },
  { topic: "Memory Reference Instructions", ch: 3, freq: 1, appeared: ["S2024"] },
  { topic: "Subroutine (short note)", ch: 4, freq: 2, appeared: ["S2025","W2023"] },
  { topic: "Second Pass Assembler with Flowchart", ch: 4, freq: 1, appeared: ["S2025"] },
  { topic: "Assembly Program: Add 50 Numbers (loop)", ch: 4, freq: 1, appeared: ["W2024"] },
  { topic: "Assembly Program: Double Precision Addition", ch: 4, freq: 1, appeared: ["S2025"] },
  { topic: "Fetch Subroutine of Microprogrammed Control", ch: 5, freq: 1, appeared: ["W2024"] },
  { topic: "4 ALU Arithmetic Operations", ch: 10, freq: 1, appeared: ["W2023"] },
  { topic: "4-bit Incrementer using Full Adder", ch: 10, freq: 1, appeared: ["W2025"] },
  { topic: "Address Space Calculations (24-bit / 16-bit)", ch: 9, freq: 1, appeared: ["W2023"] },
];

const questions7 = [
  { topic: "Addressing Modes (5–7 modes with examples)", ch: 6, freq: 4, appeared: ["W2024","S2024","S2025","W2025"] },
  { topic: "Cache Memory Mapping (Associative / Direct / Set-Associative)", ch: 9, freq: 3, appeared: ["W2024","S2024","W2025"] },
  { topic: "Cache Coherence Problem & Solutions", ch: 11, freq: 3, appeared: ["W2024","S2024","W2025"] },
  { topic: "Virtual Memory / Address Mapping", ch: 9, freq: 3, appeared: ["W2024","W2025","W2023"] },
  { topic: "Multiprocessor Interconnection Structures (any 3)", ch: 11, freq: 3, appeared: ["W2024","W2023","S2024"] },
  { topic: "Assembler (First Pass / Second Pass with Flowchart)", ch: 4, freq: 3, appeared: ["S2024","S2025","W2025"] },
  { topic: "Register Stack & Memory Stack Organizations", ch: 6, freq: 3, appeared: ["W2024","S2024","W2025"] },
  { topic: "RISC vs CISC (detailed)", ch: 6, freq: 2, appeared: ["W2024","W2025"] },
  { topic: "Microprogrammed Control Organization", ch: 5, freq: 2, appeared: ["S2024","W2023"] },
  { topic: "Booth's Multiplication Algorithm (with flowchart)", ch: 10, freq: 2, appeared: ["W2023","W2025"] },
  { topic: "Control Unit of Basic Computer (block diagram)", ch: 3, freq: 2, appeared: ["S2025","W2025"] },
  { topic: "Instruction Cycle with Flowchart", ch: 3, freq: 2, appeared: ["S2024","S2025"] },
  { topic: "Memory Reference Instructions of Basic Computer", ch: 3, freq: 2, appeared: ["W2024","S2024"] },
  { topic: "Interrupt Cycle with Flowchart", ch: 8, freq: 2, appeared: ["S2025","W2025"] },
  { topic: "Asynchronous Data Transfer", ch: 8, freq: 2, appeared: ["W2024","S2025"] },
  { topic: "Pipelining Technique / Pipeline Structure", ch: 7, freq: 2, appeared: ["S2024","W2025"] },
  { topic: "Assembly Program: Average of 10 Numbers", ch: 4, freq: 1, appeared: ["S2025"] },
  { topic: "Shift Micro-Operations + 4-bit Shifter Circuit", ch: 2, freq: 1, appeared: ["S2025"] },
  { topic: "Common Bus System for Basic Computer", ch: 3, freq: 1, appeared: ["S2025"] },
  { topic: "Address Translation & TLB", ch: 9, freq: 1, appeared: ["W2023"] },
  { topic: "Paging and Address Translation (with example)", ch: 9, freq: 1, appeared: ["S2024"] },
  { topic: "Memory Hierarchies", ch: 9, freq: 1, appeared: ["W2023"] },
  { topic: "Addition & Subtraction with Signed Magnitude", ch: 10, freq: 1, appeared: ["W2024"] },
  { topic: "Floating Point Multiplication Flowchart", ch: 10, freq: 1, appeared: ["W2025"] },
  { topic: "Multiplication Program Flowchart", ch: 10, freq: 1, appeared: ["S2025"] },
  { topic: "Flynn's Classification (detailed)", ch: 7, freq: 1, appeared: ["S2025"] },
  { topic: "Three/Two Address Instructions (expression)", ch: 6, freq: 1, appeared: ["W2024"] },
  { topic: "Overlapped Register Windows (RISC)", ch: 6, freq: 1, appeared: ["W2025"] },
  { topic: "Subroutine Call vs Interrupt Request", ch: 4, freq: 1, appeared: ["W2023"] },
  { topic: "Dynamic Arbitration Algorithms", ch: 11, freq: 1, appeared: ["W2023"] },
];

const impList = [
  { topic: "Addressing Modes (3/4/7 marks versions)", ch: 6, freq: 6, level: "mimp" },
  { topic: "Cache Memory Mapping (Associative / Direct / Set-Assoc.)", ch: 9, freq: 4, level: "mimp" },
  { topic: "Cache Coherence Problem & Solutions", ch: 11, freq: 4, level: "mimp" },
  { topic: "RISC vs CISC", ch: 6, freq: 4, level: "mimp" },
  { topic: "Virtual Memory & Address Mapping", ch: 9, freq: 4, level: "mimp" },
  { topic: "Flynn's Classification", ch: 7, freq: 4, level: "mimp" },
  { topic: "Multiprocessor Interconnection Structures", ch: 11, freq: 4, level: "mimp" },
  { topic: "Address Sequencing (Microprogrammed Control)", ch: 5, freq: 4, level: "mimp" },
  { topic: "Assembler – First Pass / Second Pass with Flowchart", ch: 4, freq: 4, level: "mimp" },
  { topic: "Register Stack & Memory Stack", ch: 6, freq: 4, level: "mimp" },
  { topic: "Tightly vs Loosely Coupled Multiprocessors", ch: 11, freq: 4, level: "mimp" },
  { topic: "Interrupt Cycle with Flowchart", ch: 8, freq: 3, level: "mimp" },
  { topic: "Pipeline Technique & Conflicts", ch: 7, freq: 3, level: "imp" },
  { topic: "Booth's Multiplication Algorithm", ch: 10, freq: 3, level: "imp" },
  { topic: "Instruction Cycle with Flowchart", ch: 3, freq: 3, level: "imp" },
  { topic: "Control Unit of Basic Computer", ch: 3, freq: 3, level: "imp" },
  { topic: "Memory Reference Instructions", ch: 3, freq: 3, level: "imp" },
  { topic: "Handshaking / Asynchronous Data Transfer", ch: 8, freq: 3, level: "imp" },
  { topic: "Daisy Chain Priority Interrupt", ch: 8, freq: 3, level: "imp" },
  { topic: "Shift Micro-Operations", ch: 2, freq: 3, level: "imp" },
  { topic: "RTL – Register Transfer Language", ch: 2, freq: 2, level: "imp" },
  { topic: "Signed Number Representation (SM, 1's, 2's complement)", ch: 1, freq: 2, level: "imp" },
  { topic: "Instruction Format with Types", ch: 6, freq: 2, level: "imp" },
  { topic: "SRAM vs DRAM", ch: 9, freq: 2, level: "imp" },
  { topic: "Microprogrammed Control Organization", ch: 5, freq: 2, level: "imp" },
  { topic: "Subroutine (call/return/notes)", ch: 4, freq: 2, level: "imp" },
  { topic: "Basic Computer Registers (list)", ch: 3, freq: 2, level: "imp" },
  { topic: "Memory Interleaving", ch: 9, freq: 2, level: "imp" },
];

const chColors = {
  1: "#6366f1", 2: "#8b5cf6", 3: "#ec4899", 4: "#f97316",
  5: "#eab308", 6: "#10b981", 7: "#06b6d4", 8: "#3b82f6",
  9: "#f43f5e", 10: "#a855f7", 11: "#14b8a6"
};

function FreqBadge({ freq }) {
  const color = freq >= 4 ? "#ef4444" : freq === 3 ? "#f97316" : freq === 2 ? "#eab308" : "#6b7280";
  return (
    <span style={{
      background: color, color: "#fff", borderRadius: 6,
      padding: "2px 8px", fontSize: 11, fontWeight: 700,
      minWidth: 28, textAlign: "center", display: "inline-block"
    }}>
      {freq}×
    </span>
  );
}

function ChBadge({ ch }) {
  return (
    <span style={{
      background: chColors[ch] + "22", color: chColors[ch],
      border: `1px solid ${chColors[ch]}55`,
      borderRadius: 6, padding: "2px 7px", fontSize: 11, fontWeight: 600,
      whiteSpace: "nowrap"
    }}>
      Ch.{ch}
    </span>
  );
}

function PaperTag({ paper }) {
  const tagColor = {
    W2023: "#6366f1", S2024: "#10b981", W2024: "#f97316",
    S2025: "#3b82f6", W2025: "#ec4899"
  };
  return (
    <span style={{
      background: (tagColor[paper] || "#888") + "20",
      color: tagColor[paper] || "#888",
      border: `1px solid ${(tagColor[paper] || "#888")}44`,
      borderRadius: 4, padding: "1px 6px", fontSize: 10, fontWeight: 600,
      marginRight: 3, whiteSpace: "nowrap"
    }}>
      {paper}
    </span>
  );
}

function QTable({ data, marks }) {
  const markColor = marks === 3 ? "#6366f1" : marks === 4 ? "#10b981" : "#f97316";

  // Group by chapter, sorted chapter-wise, then by freq desc within chapter
  const grouped = {};
  [...data]
    .sort((a, b) => a.ch - b.ch || b.freq - a.freq)
    .forEach(q => {
      if (!grouped[q.ch]) grouped[q.ch] = [];
      grouped[q.ch].push(q);
    });

  let globalIdx = 1;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div style={{
          background: markColor, color: "#fff", borderRadius: 8,
          padding: "4px 16px", fontSize: 15, fontWeight: 800
        }}>
          {marks} Marks
        </div>
        <span style={{ color: "#94a3b8", fontSize: 13 }}>
          {data.length} unique topics · chapter-wise order
        </span>
      </div>

      {Object.keys(grouped).map(chNum => {
        const ch = parseInt(chNum);
        const color = chColors[ch];
        const qs = grouped[ch];
        return (
          <div key={ch} style={{ marginBottom: 18 }}>
            {/* Chapter Header */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: color + "18",
              border: `1px solid ${color}44`,
              borderRadius: "10px 10px 0 0",
              padding: "9px 14px",
            }}>
              <div style={{
                background: color, color: "#fff", borderRadius: 6,
                padding: "2px 10px", fontSize: 12, fontWeight: 800,
                letterSpacing: 0.5
              }}>
                Ch.{ch}
              </div>
              <span style={{ color: color, fontWeight: 700, fontSize: 13 }}>
                {chapters[ch].replace(`Ch.${ch} – `, "")}
              </span>
              <span style={{
                marginLeft: "auto", color: color + "bb", fontSize: 11, fontWeight: 600
              }}>
                {qs.length} question{qs.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Questions rows */}
            <div style={{
              border: `1px solid ${color}33`, borderTop: "none",
              borderRadius: "0 0 10px 10px", overflow: "hidden"
            }}>
              {qs.map((q, i) => {
                const rowIdx = globalIdx++;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px",
                    background: i % 2 === 0 ? "#0a0f1e" : "#0f172a",
                    borderTop: i > 0 ? "1px solid #1e293b" : "none",
                    flexWrap: "wrap"
                  }}>
                    {/* Serial number */}
                    <span style={{
                      color: color + "99", fontWeight: 700, fontSize: 13,
                      minWidth: 26, paddingTop: 1
                    }}>
                      {rowIdx}.
                    </span>
                    {/* Topic */}
                    <span style={{
                      color: "#e2e8f0", fontSize: 13, flex: 1,
                      lineHeight: 1.5, minWidth: 160
                    }}>
                      {q.topic}
                    </span>
                    {/* Freq + Papers */}
                    <div style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "flex-end", gap: 5
                    }}>
                      <FreqBadge freq={q.freq} />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-end" }}>
                        {q.appeared.map(p => <PaperTag key={p} paper={p} />)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ImpList() {
  const mimp = impList.filter(q => q.level === "mimp").sort((a, b) => b.freq - a.freq);
  const imp = impList.filter(q => q.level === "imp").sort((a, b) => b.freq - a.freq);

  return (
    <div>
      {/* MIMP */}
      <div style={{
        background: "linear-gradient(135deg, #450a0a 0%, #1a0a0a 100%)",
        border: "2px solid #ef4444", borderRadius: 12, padding: 18, marginBottom: 24
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <div>
            <div style={{ color: "#ef4444", fontWeight: 800, fontSize: 17 }}>MOST IMPORTANT (MIMP)</div>
            <div style={{ color: "#fca5a5", fontSize: 12 }}>Asked 3+ times across papers — Study these first!</div>
          </div>
        </div>
        {mimp.map((q, i) => (
          <div key={i} style={{
            background: "#1a0a0a", borderLeft: "3px solid #ef4444",
            borderRadius: 6, padding: "10px 14px", marginBottom: 8,
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
          }}>
            <span style={{ color: "#ef4444", fontWeight: 800, fontSize: 16, minWidth: 24 }}>{i + 1}.</span>
            <span style={{ color: "#fef2f2", flex: 1, fontWeight: 600, fontSize: 13 }}>{q.topic}</span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <ChBadge ch={q.ch} />
              <FreqBadge freq={q.freq} />
            </div>
          </div>
        ))}
      </div>

      {/* IMP */}
      <div style={{
        background: "linear-gradient(135deg, #1c1917 0%, #0f172a 100%)",
        border: "2px solid #f97316", borderRadius: 12, padding: 18
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 22 }}>⭐</span>
          <div>
            <div style={{ color: "#f97316", fontWeight: 800, fontSize: 17 }}>IMPORTANT (IMP)</div>
            <div style={{ color: "#fed7aa", fontSize: 12 }}>Asked 2–3 times — Prioritize after MIMP topics</div>
          </div>
        </div>
        {imp.map((q, i) => (
          <div key={i} style={{
            background: "#0f172a", borderLeft: "3px solid #f97316",
            borderRadius: 6, padding: "10px 14px", marginBottom: 8,
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
          }}>
            <span style={{ color: "#f97316", fontWeight: 800, fontSize: 16, minWidth: 24 }}>{i + 1}.</span>
            <span style={{ color: "#fef9f0", flex: 1, fontWeight: 500, fontSize: 13 }}>{q.topic}</span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <ChBadge ch={q.ch} />
              <FreqBadge freq={q.freq} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterLegend() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
      {Object.entries(chapters).map(([ch, name]) => (
        <div key={ch} style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "#1e293b", borderRadius: 6, padding: "4px 10px"
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: chColors[parseInt(ch)]
          }} />
          <span style={{ color: "#94a3b8", fontSize: 11 }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("mimp");

  const tabs = [
    { id: "mimp", label: "🔥 IMP / MIMP", color: "#ef4444" },
    { id: "3", label: "3 Marks", color: "#6366f1" },
    { id: "4", label: "4 Marks", color: "#10b981" },
    { id: "7", label: "7 Marks", color: "#f97316" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0",
      padding: "20px 16px"
    }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          textAlign: "center", marginBottom: 28,
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          border: "1px solid #312e81", borderRadius: 16, padding: "22px 20px"
        }}>
          <div style={{ fontSize: 12, color: "#818cf8", letterSpacing: 3, fontWeight: 700, marginBottom: 6 }}>
            GUJARAT TECHNOLOGICAL UNIVERSITY · SUBJECT 3140707
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#e0e7ff", margin: "0 0 6px 0" }}>
            Computer Organization & Architecture
          </h1>
          <div style={{ color: "#6366f1", fontSize: 14, fontWeight: 600 }}>
            Question Paper Analysis · W2023 · S2024 · W2024 · S2025 · W2025
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
            {[
              { label: "Papers Analysed", val: "5" },
              { label: "3-Mark Topics", val: questions3.length },
              { label: "4-Mark Topics", val: questions4.length },
              { label: "7-Mark Topics", val: questions7.length },
            ].map(s => (
              <div key={s.label} style={{
                background: "#1e1b4b", borderRadius: 8, padding: "8px 16px", textAlign: "center"
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#818cf8" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#6366f1" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequency legend */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ color: "#64748b", fontSize: 12, alignSelf: "center" }}>Frequency:</span>
          {[
            { label: "4× Asked", color: "#ef4444" },
            { label: "3× Asked", color: "#f97316" },
            { label: "2× Asked", color: "#eab308" },
            { label: "1× Asked", color: "#6b7280" },
          ].map(f => (
            <span key={f.label} style={{
              background: f.color + "22", color: f.color,
              border: `1px solid ${f.color}55`,
              borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600
            }}>
              {f.label}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 6, marginBottom: 20, background: "#0f172a",
          padding: 6, borderRadius: 10, border: "1px solid #1e293b"
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "9px 8px",
              background: tab === t.id ? t.color : "transparent",
              color: tab === t.id ? "#fff" : "#64748b",
              border: "none", borderRadius: 7, cursor: "pointer",
              fontWeight: tab === t.id ? 700 : 500, fontSize: 13,
              transition: "all 0.2s"
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Chapter legend (for question tabs) */}
        {tab !== "mimp" && <ChapterLegend />}

        {/* Content */}
        {tab === "mimp" && <ImpList />}
        {tab === "3" && <QTable data={questions3} marks={3} />}
        {tab === "4" && <QTable data={questions4} marks={4} />}
        {tab === "7" && <QTable data={questions7} marks={7} />}

        <div style={{ textAlign: "center", color: "#334155", fontSize: 11, marginTop: 24 }}>
          Analysis based on 5 GTU COA (3140707) papers · Chapter-wise order · Study MIMP first 🎯
        </div>
      </div>
    </div>
  );
}