import Link from "next/link";
import {useRouter} from "next/router";


// @ts-ignore
export default function SideBar({children}) {
    const router = useRouter();
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
                className="flex justify-center items-center font-semibold text-3xl m-5"
            >
                <Link href="/" className="text-black">
                    yeongjae's project page
                </Link>
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