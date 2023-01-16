import Link from "next/link";
import { useRouter } from "next/router"

// @ts-ignore
export default function SideBar({children, query}: {children: any, query: any}) {
    //console.log({location.data})
    console.log(query)
    const router = useRouter()
    const {
        query: { data },
    } = router
    console.log(data)
    const menuItems = [
        {
            href: '/',
            title: 'Home',
        },
        {
            href: '/LandingPage',
            title: 'Landing_page',
        },
        {
            href: '/Login',
            title: 'Login',
        }
    ];
    return (
        <div className="min-h-screen flex flex-col">
            <header
                className="flex justify-center items-center font-semibold m-5"
            >
                <Link href="/" className="text-black text-3xl ">
                    yeongjae's project page
                </Link>
                <div>
                    welcome {data}
                </div>
            </header>
            <div className="flex flex-row">
                    <nav>
                        {menuItems.map(({ href, title }) => (
                                <Link className="m-5 text-black text-xl " href={href} key={title}>
                                        {title}
                                </Link>
                        ))}
                    </nav>
            </div>
            <main className="">{children}</main>
        </div>

    );
}