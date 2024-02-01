import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./EndStateNode.module.scss";

function EndStateNode({ data, id, selected }) {
  return (
    <>
      <NodeResizer isVisible={selected} minHeight={50} minWidth={50} />
      <div className={styles.endStateNode} id={`endStateNode_${id}`}>
        <div className="handleWrapperRight">
          <Handle
            position={Position.Right}
            id={`endStateNode_${id}_right_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`endStateNode_${id}_right_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`endStateNode_${id}_right_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`endStateNode_${id}_right_4`}
            className="handleStyle"
          />
        </div>
        <div className="handleWrapperLeft">
          <Handle
            position={Position.Left}
            id={`endStateNode_${id}_left_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`endStateNode_${id}_left_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`endStateNode_${id}_left_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`endStateNode_${id}_left_4`}
            className="handleStyle"
          />
        </div>
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default EndStateNode;
