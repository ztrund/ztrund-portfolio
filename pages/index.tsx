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
            <div className="flex flex-col xl:flex-row gap-4 mb-4 items-center">
                <div
                    className="w-full p-2 bg-background-lighter shadow-lg rounded-lg flex flex-col justify-center">
                    <div className="prose max-w-none"
                         dangerouslySetInnerHTML={{__html: homepage.sanitizedContent}}/>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "puppies": *[_type == "puppies"] {
      _id,
      name,
      gender,
      color,
      'picture': mediaItems[type == "image"][0],
      availability,
    },
    "homepage": *[_type == "homepage"][0] {
      content,
      channelUrl,
      fallbackVideoUrl,
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
