interface TriangleBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
const TriangleBar = (props: TriangleBarProps) => {
  const getPath = (
    x: number,
    y: number,
    width: number,
    height: number
  ): string => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
            ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
            Z`;
  };
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default TriangleBar;
