import {FetchParams, PageData, SocialMediaLink, TeamMember} from '../types';
import axios from "axios";
import generateFaviconUrls from "../helpers/generateFaviconUrls";
import {sanityImgUrl} from "./sanityImgUrl";
import {imageDimensionExtractor} from "../helpers/imageDimensionExtractor";
import generateCarouselUrls from "../helpers/generateCarouselUrls";
import generateDogCardUrls from "../helpers/generateDogCardUrls";
import {replaceTemplateLiterals} from "../helpers/replaceTemplateLiterals";
import {getAge} from "../helpers/getAge";
import {sanitizeHTML} from "../helpers/sanitizeHTML";
import sanityConfig from "./sanityConfig";
import generateProjectCardUrls from "../helpers/generateProjectCardUrls";

const deserializeToPageData = (rawData: PageData): PageData => {
    return {
        contactInfo: rawData.contactInfo || {},
        companyInfo: rawData.companyInfo || {},
        puppies: rawData.puppies || {},
        homepage: rawData.homepage || {},
        about: rawData.about || {},
        parents: rawData.parents || {},
        parent: rawData.parent || {},
        puppy: rawData.puppy || {},
        financing: rawData.financing || {},
        metaDescription: rawData.metaDescription || {},
        projects: rawData.projects || {},
        project: rawData.project || {},
    };
};

const fetchPageData = async (additionalQuery: string = '', fetchParams: FetchParams = {}) => {
    const query = `
    {
        "contactInfo": *[_type == "contactInfo"][0] {
        "resumeUrl": resume.asset->url,
        email,
        phone,
        location,
        businessHours[] {
            day,
            hours
        },
        socialMediaLinks[] {
            platform,
            url,
            icon
        }
        },
        "companyInfo": *[_type == "companyInfo"][0] {
        companyName,
        companyLogo,
        favicon,
        },
        ${additionalQuery}
    }
    `;

    let url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;

    if (fetchParams.name) {
        url += `&%24name=%22${encodeURIComponent(fetchParams.name)}%22`;
    }

    try {
        const response = await axios.get(url, {
            headers: {'Content-Type': 'application/json'}
        });
        let pageData = deserializeToPageData(response.data.result);
        if (pageData.companyInfo.favicon) {
            pageData.companyInfo.faviconUrls = generateFaviconUrls(pageData.companyInfo.favicon);
        }
        if (pageData.companyInfo.companyLogo) {
            const imageUrlParams = {
                h: 64,
                auto: 'format',
                q: 75,
                fit: 'min'
            };
            const companyLogo = pageData.companyInfo.companyLogo;
            companyLogo.imageUrl = sanityImgUrl(companyLogo, {...imageUrlParams, dpr: 1});
            companyLogo.srcSet = [1, 1.5, 2].map(dpr => `${sanityImgUrl(companyLogo, {
                ...imageUrlParams,
                dpr
            })} ${dpr}x`).join(', ');
            const imgDimensions = imageDimensionExtractor(companyLogo.asset._ref);
            companyLogo.width = imgDimensions.width / imgDimensions.height * 64;
            companyLogo.height = 64
        }
        if (pageData.about.team) {
            const imageUrlParams = {
                h: 128,
                w: 128,
                auto: 'format',
                q: 75,
                fit: 'min'
            };
            pageData.about.team.map((teamMember: TeamMember) => {
                teamMember.image.imageUrl = sanityImgUrl(teamMember.image, {...imageUrlParams, dpr: 1});
                teamMember.image.srcSet = [1, 1.5, 2].map(dpr => `${sanityImgUrl(teamMember.image, {
                    ...imageUrlParams,
                    dpr
                })} ${dpr}x`).join(', ');
            })
        }
        if (pageData.about.mediaItems) {
            generateCarouselUrls(pageData.about.mediaItems);
        }
        if (pageData.puppy.mediaItems) {
            generateCarouselUrls(pageData.puppy.mediaItems);
            pageData.metaDescription.description = replaceTemplateLiterals(pageData.metaDescription.description, pageData.puppy);
            pageData.puppy.age = getAge(pageData.puppy.birthdate);
            if (pageData.puppy.parents.length > 0) {
                generateDogCardUrls(pageData.puppy.parents.filter(Boolean));
            }
        }
        if (pageData.parent.mediaItems) {
            generateCarouselUrls(pageData.parent.mediaItems);
            pageData.metaDescription.description = replaceTemplateLiterals(pageData.metaDescription.description, pageData.parent);
            pageData.parent.age = getAge(pageData.parent.birthdate);
            if (pageData.parent.puppies.length > 0) {
                generateDogCardUrls(pageData.parent.puppies);
            }
        }
        if (pageData.project.mediaItems) {
            generateCarouselUrls(pageData.project.mediaItems);
            pageData.metaDescription.description = replaceTemplateLiterals(pageData.metaDescription.description, pageData.project);
        }
        if (pageData.projects.length > 0) {
            generateProjectCardUrls(pageData.projects);
        }
        if (pageData.puppies.length > 0) {
            generateDogCardUrls(pageData.puppies);
        }
        if (pageData.parents.length > 0) {
            generateDogCardUrls(pageData.parents);
        }
        if (pageData.homepage.content) {
            pageData.homepage.sanitizedContent = sanitizeHTML(pageData.homepage.content);
        }
        if (pageData.about.content) {
            pageData.about.sanitizedContent = sanitizeHTML(pageData.about.content);
        }
        if (pageData.about.teamDescription) {
            pageData.about.sanitizedTeamDescription = sanitizeHTML(pageData.about.teamDescription);
        }
        if (pageData.contactInfo.socialMediaLinks) {
            pageData.contactInfo.socialMediaLinks.map((socialMediaLink: SocialMediaLink) => {
                if (socialMediaLink.icon) {
                    [, socialMediaLink.icon.viewBox, socialMediaLink.icon.path] = socialMediaLink.icon.icon.split(" ~~ ");
                }
            });
        }
        return pageData;
    } catch (error) {
        console.error('Error fetching page data:', error);
        throw error;
    }
};

export default fetchPageData;
