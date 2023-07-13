import {GetStaticPaths, GetStaticProps} from 'next';
import fetchPageData from "../../lib/fetchPageData";
import {FetchParams, PageData} from "../../types";
import React from "react";
import Layout from "../../components/layout/layout";
import fetchPagePaths from "../../lib/fetchPagePaths";
import CustomCarousel from "../../components/carousel/customCarousel";

const Project = ({pageData}: { pageData: PageData }) => {
    const {project, metaDescription} = pageData;

    return (
        <Layout pageTitle={project.projectTitle}
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-2 bg-background-lighter shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-left">{project.projectTitle}</h1>
                    <h1 className="text-2xl font-normal text-right">{project.role}</h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div
                        className="w-full lg:w-1/2 h-min p-0 bg-background-lighter shadow-lg rounded-lg overflow-hidden">
                        <CustomCarousel mediaItems={project.mediaItems}/>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <div className="h-min flex flex-col gap-4">
                            {(project.codeLink || project.liveLink) && (
                                <>
                                    <div className="flex flex-row gap-4">
                                        {project.codeLink && (
                                            <a
                                                href={project.codeLink}
                                                className="w-full p-2 flex items-center justify-center text-center text-black text-lg font-semibold bg-primary-button hover:bg-primary-button-darken rounded-lg shadow-lg"
                                            >
                                                View Code @ GitHub
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                className="w-full p-2 flex items-center justify-center text-center text-black text-lg font-semibold bg-primary-button hover:bg-primary-button-darken rounded-lg shadow-lg"
                                            >
                                                View Live Project
                                            </a>
                                        )}
                                    </div>
                                    {project.otherLinks && (
                                        <div className="flex flex-row gap-4">
                                            {project.otherLinks.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.linkUrl}
                                                    className="w-full p-2 flex items-center justify-center text-center text-black text-lg font-semibold bg-primary-button hover:bg-primary-button-darken rounded-lg shadow-lg"
                                                >
                                                    {link.linkTitle}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="bg-background-lighter shadow-lg rounded-lg p-2">
                                <div className="prose text-white text-lg font-light max-w-none"
                                     dangerouslySetInnerHTML={{__html: project.sanitizedDescription}}/>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div
                                    className="bg-background-lighter shadow-lg rounded-lg p-2 w-full flex flex-col gap-2">
                                    <div className="text-2xl font-semibold text-center">Languages</div>
                                    <div className="text-lg font-light">
                                        {project.languages.map((language, index) => (
                                            <div key={index}>- {language}</div>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className="bg-background-lighter shadow-lg rounded-lg p-2 w-full flex flex-col gap-2">
                                    <div className="text-2xl font-semibold text-center">Technologies</div>
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
    const paths = await fetchPagePaths(`*[_type == "projects"]{ "name": slug.current }`);
    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const additionalQuery = `
    "project": *[_type == "projects" && slug.current == $name][0]{
      projectTitle,
      description,
      role,
      languages,
      technologies,
      codeLink,
      liveLink,
      otherLinks,
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
