
export default function ErrorMessage({children}: {children : React.ReactNode}) {
  return (
    <div className="error">
        {children}
    </div>
  )
}
