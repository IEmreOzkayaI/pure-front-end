import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./EndStateNode.module.scss";

function EndStateNode({ data, isConnectable }) {
  return (
    <>
      <NodeResizer isVisible minHeight={50} minWidth={50} />
      <div className={styles.endStateNode}>
        <Handle
          type="target"
          position={Position.Right}
          id="endStateNodeTarget"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default EndStateNode;
