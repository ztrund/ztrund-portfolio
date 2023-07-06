import {GetStaticProps} from 'next';
import fetchPageData from "../lib/fetchPageData";
import {PageData} from "../types";
import React from "react";
import Layout from "../components/layout/layout";
import CustomCarousel from "../components/carousel/customCarousel";

const About = ({pageData}: { pageData: PageData }) => {
    const {about, metaDescription} = pageData;
    return (<Layout pageTitle="About Me"
                    metaDesc={metaDescription.description}
                    pageData={pageData}>
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col w-full h-min gap-4">
                <div className="bg-background-lighter shadow-lg rounded-lg">
                    <h2 className="text-3xl font-semibold text-center mb-2">About Me</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: about.sanitizedContent}}/>
                </div>
            </div>
            {about.mediaItems && (
                <div className="w-full h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={about.mediaItems}/>
                </div>
            )}
        </div>
    </Layout>);
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "about": *[_type == "about"][0] {
      content,
      mediaItems,
      team[] {
        name,
        position,
        image,
      },
      teamDescription,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': about,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData
        },
    };
};

export default About;
