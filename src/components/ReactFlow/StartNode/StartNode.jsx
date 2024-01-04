import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./StartNode.module.scss";

function StartNode({ data, isConnectable, id }) {
  return (
    <>
      <NodeResizer isVisible minHeight={50} minWidth={50} />
      <div className={styles.startNode} id={`startNode_${id}`}>
        <Handle
          type="source"
          position={Position.Right}
          id="startNodeSource"
          isConnectable={isConnectable}
        />
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default StartNode;
