import {GetStaticProps} from 'next';
import fetchPageData from "../lib/fetchPageData";
import {PageData} from "../types";
import React from "react";
import Layout from "../components/layout/layout";
import {format} from "date-fns";

const About = ({pageData}: { pageData: PageData }) => {
    const {about, metaDescription} = pageData;
    return (<Layout pageTitle="About Me"
                    metaDesc={metaDescription.description}
                    pageData={pageData}>
        <div className="flex flex-col gap-4 items-center">
            <div className="w-full lg:w-fit bg-background-lighter shadow-lg rounded-lg p-2">
                <h2 className="text-3xl font-semibold text-center mb-2">Education</h2>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    {about.education.map((edu, index) => (
                        <div key={index} className="text-white text-lg font-light">
                            <p className="font-semibold">{edu.university}</p>
                            <p>{edu.degree}</p>
                            {edu.startDate && edu.endDate && (
                                <p>{format(new Date(edu.startDate), 'MMMM yyyy')} - {format(new Date(edu.endDate), 'MMMM yyyy')}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full bg-background-lighter shadow-lg rounded-lg p-2">
                    <h2 className="text-3xl font-semibold text-center mb-2">Bio</h2>
                    <div className="prose text-white text-lg font-light max-w-none"
                         dangerouslySetInnerHTML={{__html: about.sanitizedBio}}/>
                </div>
                <div className="w-full bg-background-lighter shadow-lg rounded-lg p-2">
                    <h2 className="text-3xl font-semibold text-center mb-2">Soft Skills</h2>
                    {about.skills.map((skill, index) => {
                        const [skillName, skillDesc] = skill.split(':');
                        return (
                            <div key={index} className="text-white text-lg font-light">
                                <span className="font-semibold">- {skillName}:</span> {skillDesc}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </Layout>);
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "about": *[_type == "about"][0] {
      bio,
      image,
      education,
      skills,
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
