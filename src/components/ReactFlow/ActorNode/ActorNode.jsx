import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./ActorNode.module.scss";

function ActorNode({ data, id, selected }) {
  return (
    <>
      <NodeResizer isVisible={selected} minHeight={300} minWidth={150} />
      <div className={styles.diagramActor} id={`actorNode_${id}`}>
        <div className="handleWrapperRight">
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_4`}
            className="handleStyle"
          />
        </div>
        <div className="handleWrapperLeft">
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_4`}
            className="handleStyle"
          />
        </div>
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default ActorNode;
