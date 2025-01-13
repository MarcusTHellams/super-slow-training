import _ from 'lodash';

type SeparatorProps = {
  turns: number;
  style: React.CSSProperties;
};

export function Separator(props: SeparatorProps) {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        transform: `rotate(${props.turns}turn)`,
      }}
    >
      <div style={props.style} />
    </div>
  );
}

type RadialSeparatorsProps = {
  count: number;
  style: React.CSSProperties;
};

export function RadialSeparators(props: RadialSeparatorsProps) {
  const turns = 1 / props.count;
  return _.range(props.count).map((index) => (
    <Separator key={index} turns={index * turns} style={props.style} />
  ));
}
