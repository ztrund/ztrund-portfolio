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

export interface BusinessHour {
    day: string;
    hours: string;
}

export interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    businessHours: BusinessHour[];
    socialMediaLinks: SocialMediaLink[];
    resumeUrl: string;
}

export interface CompanyInfo {
    companyName: string;
    companyLogo: SanityImage;
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

export interface Puppy {
    _id: string;
    name: string;
    birthdate: string;
    age: string;
    gender: string;
    color: string;
    weight: number;
    description: string;
    availability: string;
    price: number;
    mediaItems: MediaItem[];
    parents: Parent[];
    picture: MediaItem;
}

export interface Homepage {
    content: PortableTextBlock[];
    sanitizedContent: string;
    languages: string[];
    technologies: string[];
}

export interface About {
    content: PortableTextBlock[];
    sanitizedContent: string;
    mediaItems: MediaItem[];
    team: TeamMember[];
    teamDescription: PortableTextBlock[];
    sanitizedTeamDescription: string;
}

export interface TeamMember {
    name: string;
    position: string;
    image: SanityImage;
}

export interface Parent {
    _id: string;
    name: string;
    birthdate: string;
    age: string;
    gender: string;
    color: string;
    weight: number;
    description: string;
    mediaItems: MediaItem[];
    puppies: Puppy[];
    picture: MediaItem;
}

export interface Project {
    _id: string;
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

export interface Challenge {
    challengeDescription: string;
    solutionDescription: string;
}

export interface Financing {
    banner: SanityImage;
    link: string;
    logo: SanityImage;
    text: PortableTextBlock[];
    sanitizedText: string;
    displayOption: string;
}

export interface MetaDescription {
    description: string;
}

export interface PageData {
    companyInfo: CompanyInfo;
    homepage: Homepage;
    about: About;
    contactInfo: ContactInfo;
    financing: Financing;
    metaDescription: MetaDescription;
    puppies: Puppy[];
    puppy: Puppy;
    parents: Parent[];
    parent: Parent;
    projects: Project[];
    project: Project;
}

export interface FetchParams {
    name?: string;
}