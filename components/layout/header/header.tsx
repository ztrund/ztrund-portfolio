import {PageData} from "../../../types";
import {useEffect, useState} from "react";
import {CloseIcon, MenuIcon} from "../../svgIcons";
import NavLinks from "./navLinks";
import Link from "next/link";

const Header = ({pageData}: { pageData: PageData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {companyInfo} = pageData;
    const {companyName, companyLogo} = companyInfo;

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden", "lg:overflow-auto");
        } else {
            document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
        }
    }, [isOpen]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center items-center">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <Link href="/"
                              className="text-3xl font-semibold p-2 flex items-center hover:text-primary-button-lighten">
                            {companyName}
                        </Link>
                        <div className="hidden lg:flex">
                            <NavLinks isVertical={false}/>
                        </div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="lg:hidden focus:outline-none p-2 flex items-center stroke-black hover:bg-primary-button-darken bg-primary-button rounded-lg shadow-lg"
                            aria-label="Menu Toggle">
                            <MenuIcon/>
                        </button>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`fixed top-0 right-0 w-full h-full z-[90] backdrop-blur-sm backdrop-brightness-50 transform ${
                            isOpen ? "translate-x-0" : "translate-x-full"
                        } lg:hidden`} aria-label="Close Menu"/>
                    <div
                        className={`fixed top-0 right-0 w-48 h-full bg-background-lightest z-[100] transform ${
                            isOpen ? "translate-x-0 shadow-lg" : "translate-x-full"
                        } transition-transform duration-300 ease-in-out lg:hidden`}
                    >
                        <div className="flex flex-col gap-2 p-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="focus:outline-none p-2 flex bg-primary-button rounded-lg shadow-lg justify-end stroke-black hover:bg-primary-button-darken"
                                aria-label="Close Menu">
                                <CloseIcon/>
                            </button>
                            <NavLinks isVertical={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
