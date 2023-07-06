import {useRouter} from "next/router";
import Link from "next/link";

const getLinkClassName = (href: string, isVertical: boolean) => {
    const router = useRouter();
    const isActive = router.pathname === href;
    const baseClass = `hover:bg-primary-button-darken rounded-lg shadow-lg focus:outline-none flex items-center ${isVertical ? "p-2 w-full text-end justify-end" : "p-2 h-full"}`;
    const activeClass = "bg-primary-button text-black";
    const inactiveClass = "bg-background-lighter";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
};

export const NavLinks = ({isVertical}: { isVertical: boolean }) => (
    <div className={`flex items-center gap-2 ${isVertical && "flex-col"}`}>
        <Link href="/" className={getLinkClassName("/", isVertical)}>
            Home
        </Link>
        <Link href="/about" className={getLinkClassName("/about", isVertical)}>
            About Me
        </Link>
        <Link href="/projects" className={getLinkClassName("/projects", isVertical)}>
            Projects
        </Link>
        <Link href="/contact" className={getLinkClassName("/contact", isVertical)}>
            Contact Me
        </Link>
    </div>
);

export default NavLinks;