import {PageData} from '../../types';
import {CustomSVGIcon} from "../svgIcons";
import Link from "next/link";

const Footer = ({pageData}: { pageData: PageData }) => {
    const {contactInfo, companyInfo} = pageData;

    const pages = [
        {
            name: 'Home',
            url: '/',
        },
        {
            name: 'About Me',
            url: '/about',
        },
        {
            name: 'Projects',
            url: '/projects',
        },
        {
            name: 'Contact Me',
            url: '/contact',
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {contactInfo.socialMediaLinks && (
                    <div className="w-full text-center bg-background-lighter rounded-lg shadow-lg p-2">
                        <div className="text-lg font-bold mb-2">Social Media</div>
                        <ul className="flex flex-col gap-2">
                            {contactInfo.socialMediaLinks.map((link) => {
                                return (
                                    <li key={link.platform}>
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fill-white hover:fill-primary-button-lighten hover:text-primary-button-lighten flex justify-center items-center gap-2"
                                        >
                                            {link.icon && (
                                                <CustomSVGIcon viewBox={link.icon.viewBox} path={link.icon.path}/>
                                            )}
                                            {link.platform}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <div className="w-full text-center bg-background-lighter rounded-lg shadow-lg p-2">
                    <div className="text-lg font-bold mb-2">Pages</div>
                    <ul className="flex flex-col gap-2">
                        {pages.map((page) => (
                            <li key={page.name}>
                                <Link href={page.url} className="flex justify-center items-center hover:text-primary-button-lighten">{page.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-3 text-sm text-center bg-background-lighter rounded-lg shadow-lg p-2">
                <p>&copy; {new Date().getFullYear()} {companyInfo.companyName}</p>
                {contactInfo.email &&
                    <a className="hover:text-primary-button-lighten" href={`mailto:${contactInfo.email}`} target="_blank" rel="noopener noreferrer">
                        {contactInfo.email}
                    </a>
                }
                {contactInfo.phone &&
                    <a className="hover:text-primary-button-lighten" href={`tel:${contactInfo.phone}`}>
                        {contactInfo.phone}
                    </a>
                }
                {contactInfo.location &&
                    <a className="hover:text-primary-button-lighten" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`} target="_blank" rel="noopener noreferrer">
                        {contactInfo.location}
                    </a>
                }
            </div>
        </div>
    );
};

export default Footer;
