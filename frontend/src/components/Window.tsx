function Window({ children }) {
  return (
    <div
      className="window"
      style={{
        width: '100%',
        border: 2,
        boxShadow:
          '0px 20px 15px -15px rgba(0, 0, 0, 0.25), -20px 0 15px -15px rgba(0, 0, 0, 0.45)',
        background: 'linear-gradient(#ffffff, #757575)',
        borderRadius: 10,
      }}
    >
      {children}
    </div>
  )
}

export default Window
