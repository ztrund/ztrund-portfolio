import {FetchParams, PageData, SocialMediaLink} from '../types';
import axios from "axios";
import generateFaviconUrls from "../helpers/generateFaviconUrls";
import {sanityImgUrl} from "./sanityImgUrl";
import {imageDimensionExtractor} from "../helpers/imageDimensionExtractor";
import generateCarouselUrls from "../helpers/generateCarouselUrls";
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
        if (pageData.project.mediaItems) {
            generateCarouselUrls(pageData.project.mediaItems);
            // pageData.metaDescription.description = replaceTemplateLiterals(pageData.metaDescription.description, pageData.project);
        }
        if (pageData.projects.length > 0) {
            generateProjectCardUrls(pageData.projects);
        }
        if (pageData.homepage.content) {
            pageData.homepage.sanitizedContent = sanitizeHTML(pageData.homepage.content);
        }
        if (pageData.about.bio) {
            pageData.about.sanitizedBio = sanitizeHTML(pageData.about.bio);
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
