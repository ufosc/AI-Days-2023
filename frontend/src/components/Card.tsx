import { Image } from "react-bootstrap";

interface Props {
  src: string;
  width: number;
  height?: number;
  horizMargin?: number;
  borderRadius?: number;
}

export default function Card(props: Props) {
  const width = props.width,
    height = props.height ?? props.width,
    horizMargin = props.horizMargin ?? 0,
    borderRadius = props.borderRadius ?? 10;
  return (
    <Image
      src={props.src}
      width={width}
      height={height}
      style={{
        marginLeft: horizMargin,
        marginRight: horizMargin,
        borderRadius: borderRadius,
      }}
    />
  );
}
