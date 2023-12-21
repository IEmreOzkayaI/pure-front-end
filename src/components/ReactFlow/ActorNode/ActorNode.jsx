import React from "react";
import { Handle, Position } from "reactflow";
import styles from "./ActorNode.module.scss";

function ActorNode({ data, isConnectable }) {
  return (
    <div className={styles.diagramActor}>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ActorNode;
