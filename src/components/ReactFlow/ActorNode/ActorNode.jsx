import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./ActorNode.module.scss";

function ActorNode({ data, isConnectable }) {
  return (
    <>
      <NodeResizer isVisible minHeight={300} minWidth={150} />

      <div className={styles.diagramActor}>
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default ActorNode;
