import { useQuery } from "@tanstack/react-query"

export default function QueryComponent(){

   const query = useQuery(['key'], async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      return res.json()
   })

   return <div>Hello from react-query: {JSON.stringify(query.data.title)}</div>
}