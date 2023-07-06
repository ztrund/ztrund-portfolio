import React, {useMemo, useState} from 'react';
import {GetStaticProps} from 'next';
import {PageData, Project} from "../types";
import fetchPageData from "../lib/fetchPageData";
import NameFilter from "../components/filters/nameFilter";
import Layout from "../components/layout/layout";
import {FilterOrCloseIcon} from "../components/svgIcons";
import ProjectCard from "../components/projectCard";

const Puppies = ({pageData}: { pageData: PageData }) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const {metaDescription, projects} = pageData;

    const [searchTerm, setSearchTerm] = useState('');

    const sortedAndFilteredProjects = useMemo(() => {
        return [...projects]
            .filter((project: Project) => {
                const matchesSearchTerm = project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());

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
                    <div
                        className={`hidden lg:flex justify-center flex-col w-48 h-min gap-2 divide-black divide-y bg-background-lighter shadow-lg rounded-lg p-2 overflow-hidden`}>
                        <NameFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} id="Desktop"/>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <div
                            className="flex h-12 justify-between lg:justify-center items-center bg-background-lighter shadow-lg rounded-lg overflow-hidden">
                            <h1 className="text-3xl px-2">Projects</h1>
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className="lg:hidden items-center h-full px-4 rounded-r-lg bg-primary-button stroke-black hover:bg-primary-button-darken"
                                aria-label={isFiltersOpen ? "Close filters" : "Open filters"}
                            >
                                <FilterOrCloseIcon isOpen={isFiltersOpen}/>
                            </button>
                        </div>
                        <div
                            className={`${isFiltersOpen ? "flex" : "hidden"} lg:hidden justify-center flex-col w-full h-min bg-background-lighter shadow-lg rounded-lg p-2 overflow-clip`}>
                            <div className="flex flex-col md:flex-row">
                                <div className="flex flex-col md:w-1/2">
                                    <div className="pr-2 pb-2">
                                        <NameFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                                    id="Mobile"/>
                                    </div>
                                </div>
                            </div>
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
