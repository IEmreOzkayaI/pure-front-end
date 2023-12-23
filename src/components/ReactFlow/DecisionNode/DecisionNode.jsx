import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./DecisionNode.module.scss";

function DecisionNode({ data, isConnectable }) {
  console.log("data", data);
  return (
    <>
      <NodeResizer isVisible minWidth={50} minHeight={50} />

      <div className={styles.decision}>
        <Handle
          type="target"
          position={Position.Left}
          id="decisionNodeTarget"
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="decisionNodeSource"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default DecisionNode;
