export const AppHeaderText = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div
      style={{
        color: 'rgba(255, 255, 255, 0.65)',
        colorScheme: 'light',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: '14px',
        textWrap: 'nowrap',
        alignContent: 'start',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}
