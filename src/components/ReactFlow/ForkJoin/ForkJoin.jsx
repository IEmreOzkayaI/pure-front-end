import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./ForkJoin.module.scss";

function ForkJoin({ id, selected }) {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minHeight={70}
        minWidth={3}
        maxWidth={15}
      />
      <div className={styles.fork} id={`fork_${id}`}>
        <div className="handleWrapperRight">
          <Handle
            position={Position.Right}
            id={`forkjoin_${id}_right_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`forkjoin_${id}_right_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`forkjoin_${id}_right_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Right}
            id={`forkjoin_${id}_right_4`}
            className="handleStyle"
          />
        </div>
        <div className="handleWrapperLeft">
          <Handle
            position={Position.Left}
            id={`forkjoin_${id}_left_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`forkjoin_${id}_left_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`forkjoin_${id}_left_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`forkjoin_${id}_left_4`}
            className="handleStyle"
          />
        </div>
      </div>
    </>
  );
}

export default ForkJoin;
