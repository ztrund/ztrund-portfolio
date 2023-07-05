import {Parent, Project, Puppy} from "../types";
import {sanityImgUrl} from "../lib/sanityImgUrl";

const generateProjectCardUrls = (projects: Project[]) => {
    const imageUrlParams = {
        auto: 'format',
        q: 75,
        fit: 'min'
    };
    const widths = [300, 364, 488,].map(w => [w, w * 1.5, w * 2]).flat()
    const heights = widths.map(w => Math.round(w / (16 / 9)))
    projects.map((project: Project) => {
        project.picture.image.imageUrl = sanityImgUrl(project.picture.image, {...imageUrlParams, w: widths[0], h: heights[0]});
        project.picture.image.srcSet = widths.map((w, i) => `${sanityImgUrl(project.picture.image, {
            ...imageUrlParams,
            w: w,
            h: heights[i]
        })} ${w}w`).join(', ');
    });
}

export default generateProjectCardUrls;