import { Handle, Position } from "reactflow";
import styles from "./StartNode.module.scss";

function StartNode({ data, isConnectable }) {
  return (
    <div className={styles.startNode}>
      <Handle
        type="source"
        position={Position.Right}
        id="startNodeSource"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default StartNode;
