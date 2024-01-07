import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./EndStateNode.module.scss";

function EndStateNode({ data, isConnectable, id, selected }) {
  return (
    <>
      <NodeResizer isVisible={selected} minHeight={50} minWidth={50} />
      <div className={styles.endStateNode} id={`endStateNode_${id}`}>
        <Handle
          type="target"
          position={Position.Right}
          id={`endStateNodeTarget_${id}`}
          isConnectable={isConnectable}
        />
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default EndStateNode;
