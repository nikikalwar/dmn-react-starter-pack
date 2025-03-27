import { useEffect, useRef } from "react";
import DmnJS from "dmn-js"; // Use main dmn-js instead of just Modeler

// Import styles
import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-font/css/dmn.css"; // Fix missing toolbar icons
import "dmn-js/dist/assets/dmn-js-shared.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";

const DmnEditor = () => {
  const dmnRef = useRef(null);
  const modelerRef = useRef(null);

  useEffect(() => {
    if (!dmnRef.current) return;

    modelerRef.current = new DmnJS({
      container: dmnRef.current,
    });

    // Load a blank DMN diagram
    const emptyDiagram = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" id="empty-dmn">
        <decision id="Decision_1" name="New Decision">
          <decisionTable hitPolicy="UNIQUE">
            <input id="Input_1"><inputExpression><text></text></inputExpression></input>
            <output id="Output_1" />
          </decisionTable>
        </decision>
      </definitions>`;

    modelerRef.current.importXML(emptyDiagram).catch(console.error);
  // Force reapply styles if needed
  setTimeout(() => {
    document.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
      link.href = link.href; // Reloads CSS
    });
  }, 1000);
    return () => modelerRef.current?.destroy(); // Cleanup
  }, []);

  return (
    <div
      ref={dmnRef}
      style={{
        width: "100%",
        height: "80vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
};

export default DmnEditor;
