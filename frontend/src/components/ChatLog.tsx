import Message from "./Message";

interface Props {
  messages: string[];
}

export default function ChatLog({ messages }: Props) {
  return (
    <div
      style={{
        maxHeight: "50vh",
        minHeight: "50vh",
        minWidth: "100%",
        overflow: "scroll",
      }}
    >
      {messages.map((m) => (
        <Message text={m} />
      ))}
    </div>
  );
}
