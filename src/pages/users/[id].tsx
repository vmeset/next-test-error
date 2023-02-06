import { IUser } from "@/interfaces/IUser"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data: IUser[] = await response.json()
    const paths = data.map(user => {
        return {
            params: {id: user.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<{ user: IUser }> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {

    if(!params) {
        return {
            notFound: true
        }
    }
    const id = params.id

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data: IUser = await response.json()

    return {
        props: {
            user: data
        }
    }
}

function Details ({user}: InferGetStaticPropsType<typeof getStaticProps>) {

    const router = useRouter()

	return (
		<>
            <button onClick={router.back}>getBack</button>
            <div>{user.username}</div>
		</>
	)
}

export default Details