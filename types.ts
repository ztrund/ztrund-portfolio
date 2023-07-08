import {PortableTextBlock} from "@portabletext/types";

export interface MediaItem {
    _key: string;
    type: "image" | "video";
    image: SanityImage;
    imageSlide: {
        imageUrl?: string;
        srcSet?: string;
        sizes?: string;
    };
    thumbnailImage: {
        imageUrl?: string;
        srcSet?: string;
    };
    videoUrl: string;
    videoId: string;
}

export interface SanityImage {
    asset: {
        _ref: string;
    };
    crop: {
        bottom: number;
        left: number;
        right: number;
        top: number;
    };
    hotspot: {
        height: number;
        width: number;
        x: number;
        y: number;
    }
    imageUrl?: string;
    srcSet?: string;
    sizes?: string;
    height?: number;
    width?: number;
}

export interface SocialMediaLink {
    platform: string;
    url: string;
    icon: {
        icon: string;
        viewBox: string;
        path: string;
    };
}

export interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    socialMediaLinks: SocialMediaLink[];
    resumeUrl: string;
}

export interface CompanyInfo {
    companyName: string;
    favicon: SanityImage;
    faviconUrls: {
        default: string;
        png512: string;
        png192: string;
        png32: string;
        png16: string;
        appleTouch: string;
    }
}

export interface Homepage {
    content: PortableTextBlock[];
    sanitizedContent: string;
    languages: string[];
    technologies: string[];
}

export interface About {
    bio: PortableTextBlock[];
    sanitizedBio: string;
    image: MediaItem;
    education: Education[];
    skills: string[];
}

export interface Education {
    degree: string;
    university: string;
    startDate: string;
    endDate: string;
}

export interface Project {
    _id: string;
    slug: Slug;
    projectTitle: string;
    description: string;
    role: string;
    languages: string[];
    technologies: string[];
    codeLink: string;
    liveLink: string;
    mediaItems: MediaItem[];
    picture: MediaItem;
    challenges: Challenge[];
}

export interface Slug {
    current: string;
}

export interface Challenge {
    challengeDescription: string;
    solutionDescription: string;
}

export interface MetaDescription {
    description: string;
}

export interface PageData {
    companyInfo: CompanyInfo;
    homepage: Homepage;
    about: About;
    contactInfo: ContactInfo;
    metaDescription: MetaDescription;
    projects: Project[];
    project: Project;
}

export interface FetchParams {
    name?: string;
}