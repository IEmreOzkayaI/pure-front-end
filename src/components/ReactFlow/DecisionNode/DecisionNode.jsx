import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./DecisionNode.module.scss";

function DecisionNode({ data, isConnectable, id }) {
  return (
    <>
      <NodeResizer isVisible minWidth={50} minHeight={50} />

      <div className={styles.decision} id={`decisionNode_${id}`}>
        <Handle
          type="target"
          position={Position.Left}
          id={`decisionNodeTarget_${id}`}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id={`decisionNodeSource_${id}`}
          isConnectable={isConnectable}
        />
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default DecisionNode;
