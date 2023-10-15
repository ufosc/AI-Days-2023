import Window from "./Window";
import ChatLog from "./ChatLog";
import InputBar from "./InputBar";

interface Props {
  messages: string[];
}

export default function ChatWindow({ messages }: Props) {
  return (
    <div style={{ minWidth: "100%" }}>
      <Window>
        <div
          style={{
            margin: "10px",
            maxHeight: "50vh",
            height: "50vh",
            minWidth: "100%",
          }}
        >
          <ChatLog messages={messages} />
        </div>
        <InputBar />
      </Window>
    </div>
  );
}
