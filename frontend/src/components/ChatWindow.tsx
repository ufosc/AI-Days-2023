import Window from './Window'
import ChatLog from './ChatLog'
import InputBar from './InputBar'

interface Props {
  messages: string[]
}

export default function ChatWindow({ messages }: Props) {
  return (
    <Window>
      <div style={{ maxHeight: '58vh', height: '58vh' }}>
        <ChatLog messages={messages} />
        <InputBar />
      </div>
    </Window>
  )
}
