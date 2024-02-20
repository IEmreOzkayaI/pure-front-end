import { Handle, Position, NodeResizer } from "reactflow";
import styles from "./LifeLine.module.scss";

function LifeLine({ data, id, selected }) {
  return (
    <>
      <NodeResizer isVisible={selected} minHeight={350} minWidth={190} />

      <div className={styles.lifeLine} id={`lifeLine_${id}`}>
        <div className="handleWrapperRight">
          <Handle
            position={Position.Right}
            className="handleStyle"
            id={`lifeLine_${id}_right_1`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`lifeLine_${id}_right_2`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`lifeLine_${id}_right_3`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`lifeLine_${id}_right_4`}
          />
          <Handle
            position={Position.Right}
            className="handleStyle"
            id={`lifeLine_${id}_right_5`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`lifeLine_${id}_right_6`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`lifeLine_${id}_right_7`}
          />
          <Handle
            className="handleStyle"
            position={Position.Right}
            id={`lifeLine_${id}_right_8`}
          />
        </div>
        <div className="handleWrapperLeft">
          <Handle
            position={Position.Left}
            id={`lifeLine_${id}_left_1`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`lifeLine_${id}_left_2`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`lifeLine_${id}_left_3`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            className="handleStyle"
            id={`lifeLine_${id}_left_4`}
          />
          <Handle
            position={Position.Left}
            id={`lifeLine_${id}_left_5`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`lifeLine_${id}_left_6`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            id={`lifeLine_${id}_left_7`}
            className="handleStyle"
          />
          <Handle
            position={Position.Left}
            className="handleStyle"
            id={`lifeLine_${id}_left_8`}
          />
        </div>
      </div>
      <div className={styles.label}>{data?.label}</div>
    </>
  );
}

export default LifeLine;
