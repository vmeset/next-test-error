import Link from "next/link"

export const Layout = ({ ...props }): JSX.Element => {
	return (
		<>
            <nav>
                <div>
                    <Link href={'/users'}>Users</Link>
                </div>
                <div>
                    <Link href={'/reviews'}>Rews</Link>
                </div>
            </nav>
		</>
	)
}