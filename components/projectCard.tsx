import {FunctionComponent} from 'react';
import {Project} from '../types';
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
    cardWidth?: string;
    imageSizes?: string;
    lazy?: boolean;
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({
                                                              project,
                                                              cardWidth = 'w-full sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]',
                                                              imageSizes = '(max-width: 639px) calc(100vw-32px), (max-width: 767px) 296px, (max-width: 1023px) 360px, (max-width: 1279px) 488px, (max-width: 1535px) 300px, 364px',
                                                              lazy = true,
                                                          }) => {
    const url = `/projects/${project.slug.current}`;

    const projectImage = project.picture.image;

    return (<Link href={url}
                  className={`primary-container bg-background-lighter rounded-lg overflow-hidden shadow-lg hover:bg-primary-button-darken hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 ${cardWidth}`}>
        <div className="aspect-video overflow-hidden flex items-center justify-center">
            {!lazy && <link
                rel="preload"
                as="image"
                href={projectImage.imageUrl}
                imageSrcSet={projectImage.srcSet}
                imageSizes={imageSizes}
            />}
            <img
                src={projectImage.imageUrl}
                srcSet={projectImage.srcSet}
                sizes={imageSizes}
                alt={project.projectTitle}
                className="w-full h-full object-cover"
                loading={lazy ? "lazy" : "eager"}
            />
        </div>
        <div className="p-2 h-24 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold aspect">{project.projectTitle}</h2>
                <p className="">{project.role}</p>
                <p className="">{project.languages.join(', ')}</p>
            </div>
        </div>
    </Link>);
}

export default ProjectCard;