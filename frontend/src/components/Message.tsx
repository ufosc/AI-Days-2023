interface Props {
  text: string
}

export default function Message({ text }: Props) {
  return <p>{text}</p>
}
