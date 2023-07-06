import React, {ChangeEvent, useMemo, useState} from 'react';
import {GetStaticProps} from 'next';
import {PageData, Project} from "../types";
import fetchPageData from "../lib/fetchPageData";
import Layout from "../components/layout/layout";
import ProjectCard from "../components/projectCard";

const Puppies = ({pageData}: { pageData: PageData }) => {
    const {metaDescription, projects} = pageData;

    const [searchTerm, setSearchTerm] = useState('');

    const sortedAndFilteredProjects = useMemo(() => { //Doesn't work how I want it to need to fix it, cant search multiple words correctly, and I want dropdown with tags sort of thing.
        return [...projects]
            .filter((project: Project) => {
                const matchesSearchTerm = project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.languages.some(language => language.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    project.role.toLowerCase().includes(searchTerm.toLowerCase());

                return (
                    matchesSearchTerm
                );
            });
    }, [projects, searchTerm]);

    return (
        <Layout pageTitle="Projects"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-full gap-4">
                        <div
                            className="flex justify-between items-center bg-background-lighter shadow-lg rounded-lg overflow-hidden p-2">
                            <h1 className="text-3xl font-semibold">Projects</h1>
                            <input
                                type="text"
                                className="rounded-lg py-0 px-2 placeholder-gray-400 bg-background-lightest border-black focus:ring-primary-button focus:border-primary-button"
                                placeholder="Search"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {
                                sortedAndFilteredProjects.length > 0 ? (
                                    sortedAndFilteredProjects.map((project: Project, index: number) => (
                                        <ProjectCard
                                            project={project}
                                            cardWidth={"w-full sm:w-[calc(50%-8px)] xl:w-[calc(100%/3-10.66px)] 2xl:w-[calc(25%-12px)]"}
                                            imageSizes={"(max-width: 639px) calc(100vw-32px), (max-width: 767px) 296px, (max-width: 1023px) 360px, (max-width: 1279px) 399px, (max-width: 1535px) 344px, 317px"}
                                            key={project._id}
                                            lazy={index > 1}
                                        />
                                    ))
                                ) : (
                                    <div
                                        className="h-auto w-auto bg-background-lighter rounded-lg text-xl p-2">
                                        No projects found :(
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "projects": *[_type == "projects"] | order(projectTitle) {
      _id,
      projectTitle,
      role,
      languages,
      'picture': mediaItems[type == "image"][0],
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': projects,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData
        },
    };
};

export default Puppies;
