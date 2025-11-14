
const ErrorComp = ({message}: {message?: string}) => {
  return (
     <div className="min-h-screen flex items-center justify-center text-red-400 text-center">
    <p className="text-2xl mb-2">Error Loading Data</p>
    <p>{message || "Something went wrong"}</p>
  </div>
  )
}

export default ErrorComp