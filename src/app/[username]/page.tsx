import Footer from "@/components/Footer"
import TestUi from "@/components/TestUi"
import { db } from "@/db"
import { notFound, redirect } from "next/navigation"


interface PageProps {
    params: {
        username: string
    }
}

const Page = async ({params}: PageProps) => {

    const {username} = params

    const user = await db.user.findFirst({
        where: {
            username: username,
        }
    })

    if (!user) notFound()

    return (
        <>
            <TestUi username={user} />
        </>
    )
}

export default Page