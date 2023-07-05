interface IconProps {
  size: number;
  symbol: {
    viewbox: string;
    id: string;
  };
}

function Icon({ symbol, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox={symbol.viewbox}>
      <use xlinkHref={`#${symbol.id}`} />
    </svg>
  );
}

export default Icon;
