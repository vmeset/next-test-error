import { IReview } from "@/interfaces/IReview"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps<{ reviews: IReview[] }> = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments')
    const reviews: IReview[] = await response.json()
    return {
        props: {
            reviews
        }
    }
}

function Reviews ({ reviews }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter()

	return (
		<>
            <button onClick={router.back}>back</button>
            {!!reviews.length && reviews.map((rev: IReview) => {
                return (
                    <div key={rev.id}>
                        {rev.id} {rev.name.slice(0, 20)}
                    </div>
                )
            })}
		</>
	)
}

export default Reviews