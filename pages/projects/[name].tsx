import {GetStaticPaths, GetStaticProps} from 'next';
import fetchPageData from "../../lib/fetchPageData";
import {FetchParams, PageData} from "../../types";
import React from "react";
import Layout from "../../components/layout/layout";
import fetchPagePaths from "../../lib/fetchPagePaths";

const Project = ({pageData}: { pageData: PageData }) => {
    const {project, metaDescription} = pageData;

    return (
        <Layout pageTitle={project.projectTitle}
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-2 bg-background-lighter shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold">{project.projectTitle}</h1>
                    <h1 className="text-2xl font-normal">{project.role}</h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div
                        className="w-full lg:w-1/2 h-min p-0 bg-background-lighter shadow-lg rounded-lg overflow-hidden">
                        {/* Render your project media items here */}
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <div className="h-min p-2 bg-background-lighter shadow-lg rounded-lg flex flex-col gap-4">
                            <p className="text-lg font-light">{project.description}</p>
                            <div className="flex flex-row">
                                <div className="w-full flex flex-col gap-2">
                                    <div className="text-2xl font-semibold">Languages</div>
                                    <div className="text-lg font-light">
                                        {project.languages.map((language, index) => (
                                            <div key={index}>- {language}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <div className="text-2xl font-semibold">Technologies</div>
                                    <div className="text-lg font-light">
                                        {project.technologies.map((technology, index) => (
                                            <div key={index}>- {technology}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await fetchPagePaths(`*[_type == "projects"]{ "name": projectTitle }`);
    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const additionalQuery = `
    "project": *[_type == "projects" && projectTitle match $name][0]{
      projectTitle,
      description,
      role,
      languages,
      technologies,
      codeLink,
      liveLink,
      mediaItems,
      challenges,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': project,
    },
  `;

    const fetchParams: FetchParams = {
        name: Array.isArray(params?.name) ? params?.name[0] : params?.name,
    };

    const pageData = await fetchPageData(additionalQuery, fetchParams);

    return {
        props: {
            pageData
        },
    };
};

export default Project;
