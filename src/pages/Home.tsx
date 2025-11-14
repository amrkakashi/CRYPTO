import { getData } from '../helpers/getData'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
    const {data,isLoading,error} = useQuery({
        queryKey: ['coins'],
        queryFn: getData
    })
    console.log(data)
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Home</h1>
      <p>Scroll down</p>
      <div className="h-[2000px]"></div>
    </div>
  )
}

export default Home