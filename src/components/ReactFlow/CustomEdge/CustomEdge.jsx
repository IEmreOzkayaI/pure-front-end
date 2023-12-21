import {
  Position,
  BaseEdge,
  getBezierPath,
  EdgeLabelRenderer,
  useReactFlow,
} from "reactflow";
import PropTypes from "prop-types";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Right,
    targetX,
    targetY,
    targetPosition: Position.Left,
  });
  console.log(edgePath);
  console.log(labelX);
  console.log(labelY);
  console.log(sourceX);
  console.log(sourceY);
  console.log(targetX);
  console.log(targetY);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div style={{ width: "min-content" }}>
          <button
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
            onClick={() =>
              setEdges((edges) => edges.filter((e) => e.id !== id))
            }
          >
            delete
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

CustomEdge.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  label: PropTypes.string,
};
