import { useEffect, useRef } from "react";
import DmnModeler from "dmn-js/lib/Modeler";

import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-font/css/dmn.css"; // ✅ Toolbar icons fix
import "dmn-js/dist/assets/dmn-js-shared.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";

const DmnEditor = () => {
  const dmnRef = useRef(null);
  const modelerRef = useRef(null);

  useEffect(() => {
    if (!dmnRef.current) return;

    modelerRef.current = new DmnModeler({
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

    return () => modelerRef.current?.destroy(); // Cleanup
  }, []);

  return <div ref={dmnRef} style={{ width: "100%", height: "600px", border: "1px solid #ccc" }} />;
};

export default DmnEditor;
