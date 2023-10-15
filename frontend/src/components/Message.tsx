interface Props {
  text: string;
}

export default function Message({ text }: Props) {
  return(
      <div style={{
          borderRadius: 10
      }}>
        <p>{text}</p>
      </div>
  );
}
