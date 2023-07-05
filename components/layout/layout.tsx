import Head from "next/head";
import React from "react";
import {PageData} from "../../types";
import Footer from "./footer";
import Header from "./header/header";

interface LayoutProps {
    children: React.ReactNode;
    pageTitle: string;
    pageData: PageData;
    metaDesc?: string;
}

const Layout = ({children, pageTitle, metaDesc, pageData}: LayoutProps) => {
    const faviconUrls = pageData.companyInfo.faviconUrls;

    return (
        <div id="root" className="flex flex-col min-h-screen bg-background text-white">
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href={faviconUrls.default}/>
                <link rel="icon" type="image/png" sizes="512x512"
                      href={faviconUrls.png512}/>
                <link rel="icon" type="image/png" sizes="192x192"
                      href={faviconUrls.png192}/>
                <link rel="icon" type="image/png" sizes="32x32"
                      href={faviconUrls.png32}/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href={faviconUrls.png16}/>
                <link rel="apple-touch-icon" sizes="180x180"
                      href={faviconUrls.appleTouch}/>
                <meta
                    name="description"
                    content={metaDesc}
                />
                <meta name="theme-color" content="hsl(39, 76%, 52%)"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <header>
                <Header pageData={pageData}/>
            </header>
            <main className="container mx-auto px-4 flex-grow flex-shrink-0">{children}</main>
            <footer>
                <Footer pageData={pageData}/>
            </footer>
        </div>
    );
};

export default Layout;
