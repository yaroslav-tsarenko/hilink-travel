import { contours } from '@/lib/geo';

type Props = {
  seed?: number;
  className?: string;
  width?: number;
  height?: number;
  summits?: number;
  rings?: number;
  strokeWidth?: number;
};

/** Topographic contour lines drawn in SVG. Colour comes from `currentColor`. */
export default function Topo({ seed = 1, className = '', width = 800, height = 600, summits = 3, rings = 10, strokeWidth = 1 }: Props) {
  const paths = contours(seed, width, height, { summits, rings });
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden fill="none" stroke="currentColor">
      {paths.map((p, i) => (
        <path key={i} d={p.d} strokeWidth={p.index ? strokeWidth * 1.8 : strokeWidth} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
