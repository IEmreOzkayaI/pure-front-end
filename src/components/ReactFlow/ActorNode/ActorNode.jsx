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
            id={`actorNode_${id}_right_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_right_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_right_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`actorNode_${id}_right_4`}
            className="handleStyle"
          />
        </div>
        <div className="handleWrapperLeft">
          <Handle
            position={Position.Left}
            id={`actorNode_${id}_left_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`actorNode_${id}_left_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`actorNode_${id}_left_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`actorNode_${id}_left_4`}
            className="handleStyle"
          />
        </div>
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default ActorNode;
