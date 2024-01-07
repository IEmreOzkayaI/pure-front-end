import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./ActorNode.module.scss";

function ActorNode({ data, isConnectable, id, selected }) {
  return (
    <>
      <NodeResizer isVisible={selected} minHeight={300} minWidth={150} />

      <div className={styles.diagramActor} id={`actorNode_${id}`}>
        <Handle
          type="source"
          position={Position.Right}
          id={`actorNodeSource_${id}`}
          isConnectable={true}
        />
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default ActorNode;
