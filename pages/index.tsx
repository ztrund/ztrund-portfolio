import {GetStaticProps} from "next";
import React from "react";
import {PageData} from "../types";
import fetchPageData from "../lib/fetchPageData";
import Layout from "../components/layout/layout";

const HomePage = ({pageData}: { pageData: PageData }) => {
    const {metaDescription, homepage} = pageData;

    return (
        <Layout pageTitle="Home"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div
                    className="w-full p-2 bg-background-lighter shadow-lg rounded-lg flex flex-col justify-center">
                    <div className="prose text-white text-lg font-light max-w-none"
                         dangerouslySetInnerHTML={{__html: homepage.sanitizedContent}}/>
                </div>
                <div
                    className="w-full lg:w-fit p-2 bg-background-lighter shadow-lg rounded-lg flex flex-col gap-4 justify-center whitespace-nowrap">
                    <div className="text-center text-3xl font-semibold">Skills Overview</div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <div className="text-2xl font-semibold">Languages</div>
                            <div className="text-lg font-light">
                                {homepage.languages.map((language, index) => (
                                    <div key={index}>- {language}</div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <div className="text-2xl font-semibold">Technologies</div>
                            <div className="text-lg font-light">
                                {homepage.technologies.map((technology, index) => (
                                    <div key={index}>- {technology}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "homepage": *[_type == "homepage"][0] {
      content,
      languages,
      technologies,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': home,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData
        },
    };
};

export default HomePage;
