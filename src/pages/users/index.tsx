import { IUser } from "@/interfaces/IUser"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

export const getStaticProps: GetStaticProps<{ users: IUser[] }> = async (
  context
) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users: IUser[] = await res.json()

  return {
    props: {
        users
    }
  }
}

function List ({ users }: InferGetStaticPropsType<typeof getStaticProps>) {

    const router = useRouter()

	return (
		<>
            {!!users.length && users.map((user) => {
                return <div key={user.id}><Link href={`/users/${user.id}`}>{user.name}</Link></div>
            })}
		</>
	)
}

export default List