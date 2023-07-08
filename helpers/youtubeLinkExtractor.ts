export const extractYoutubeVideoId = (url: string | undefined): string => {
    if (!url) {
        return "";
    }

    const videoRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const videoMatch = url.match(videoRegex);

    if (videoMatch && videoMatch[2].length === 11) {
        return videoMatch[2];
    }

    return "";
};
