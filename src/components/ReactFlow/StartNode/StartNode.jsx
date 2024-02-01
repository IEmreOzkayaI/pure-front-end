import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./StartNode.module.scss";

function StartNode({ data, id, selected }) {
  return (
    <>
      <NodeResizer isVisible={selected} minHeight={50} minWidth={50} />
      <div className={styles.startNode} id={`startNode_${id}`}>
        <div className="handleWrapperRight">
          <Handle
            position={Position.Right}
            className="handleStyle"
            id={`startNode_${id}_right_1`}
          />
          <Handle
            position={Position.Right}
            className="handleStyle"
            id={`startNode_${id}_right_2`}
          />
          <Handle
            position={Position.Right}
            className="handleStyle"
            id={`startNode_${id}_right_3`}
          />
          <Handle
            position={Position.Right}
            className="handleStyle"
            id={`startNode_${id}_right_4`}
          />
        </div>
        <div className="handleWrapperLeft">
          <Handle
            position={Position.Left}
            className="handleStyle"
            id={`startNode_${id}_left_1`}
          />
          <Handle
            position={Position.Left}
            className="handleStyle"
            id={`startNode_${id}_left_2`}
          />
          <Handle
            position={Position.Left}
            className="handleStyle"
            id={`startNode_${id}_left_3`}
          />
          <Handle
            position={Position.Left}
            className="handleStyle"
            id={`startNode_${id}_left_4`}
          />
        </div>
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default StartNode;
