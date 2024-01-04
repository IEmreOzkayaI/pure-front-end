import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./ActionStateNode.module.scss";

function ActionStateNode({ data, isConnectable, id }) {
  return (
    <>
      <NodeResizer isVisible minHeight={80} minWidth={160} />

      <div className={styles.actionState} id={`decisionStateNode_${id}`}>
        <Handle
          type="target"
          position={Position.Top}
          id={`actionStateNodeTarget_${id}`}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id={`actionStateNodeSource_${id}`}
          isConnectable={isConnectable}
        />
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default ActionStateNode;
