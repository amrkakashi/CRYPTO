
const Loading = ({message}: {message?: string}) => {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-xl">{message || "Loading..."}</p>
    </div>
  </div>
  )
}

export default Loading