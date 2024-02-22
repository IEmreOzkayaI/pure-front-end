import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./ActionStateNode.module.scss";

function ActionStateNode({ data, id, selected }) {
  return (
    <>
      <NodeResizer isVisible={selected} minHeight={80} minWidth={160} />

      <div className={styles.actionState} id={`decisionStateNode_${id}`}>
        <div className="handleWrapperRight">
          <Handle
            position={Position.Right}
            className="handleStyle"
            id={`actionStateNode_${id}_right_1`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`actionStateNode_${id}_right_2`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`actionStateNode_${id}_right_3`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`actionStateNode_${id}_right_4`}
          />
        </div>
        <div className="handleWrapperLeft">
          <Handle
            position={Position.Left}
            id={`actionStateNode_${id}_left_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`actionStateNode_${id}_left_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`actionStateNode_${id}_left_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            className="handleStyle"
            id={`actionStateNode_${id}_left_4`}
          />
        </div>
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default ActionStateNode;
