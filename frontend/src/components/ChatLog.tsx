import Message from './Message'

interface Props {
  messages: string[]
}

export default function ChatLog({ messages }: Props) {
  return (
    <div style={{ maxHeight: '43vh', minHeight: '43vh', overflow: 'scroll' }}>
      {messages.map((m) => (
        <Message text={m} />
      ))}
    </div>
  )
}
