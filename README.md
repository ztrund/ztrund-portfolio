# ztrund Portfolio

This is my personal portfolio project designed to showcase my work and experience as a developer. The project is built
using Next.js, Sanity CMS, and hosted on Cloudflare Pages, making it an efficient, modern, and fully customizable
portfolio website. This project utilizes Tailwind CSS for styling and Preact to achieve a smaller overall bundle size.
I've also integrated the Embla Carousel library for a customizable, robust image carousel feature.

## Getting Started

Follow these steps to get the project running on your local machine:

1. Clone this repository: `git clone https://github.com/ztrund/ztrund-portfolio.git`
2. Move into the project directory: `cd ztrund-portfolio`
3. Install the dependencies: `npm install`
4. Copy the `.env.local.example` to a new file named `.env.local` and fill in your Sanity Studio settings.
5. Start the development server: `npm run dev`

## Configuration

### Local Development

For local development, you need to set the environment variables. Rename the `.env.local.example` file to `.env.local`
and fill in the values:

```plaintext
# Required, find them on https://manage.sanity.io
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
# see https://www.sanity.io/docs/api-versioning for how versioning works
SANITY_STUDIO_API_VERSION="2023-04-12"
```

## CMS (Sanity)

The CMS for this project is hosted on another
repo [ztrund Portfolio CMS](https://github.com/ztrund/ztrund-portfolio-cms). Follow the instructions there
to set up the CMS.

## Dependencies

- [Next.js](https://nextjs.org/) as the React framework.
- [Sanity](https://www.sanity.io/) as the headless CMS.
- [Cloudflare Pages](https://pages.cloudflare.com/) for continuous deployment and hosting.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS.
- [Embla Carousel](https://www.embla-carousel.com/) for creating a powerful, customizable
  carousel.
- [Preact](https://preactjs.com/) for a smaller overall bundle size.

## Acknowledgments

### Icons

- Icons from [Lucide](https://lucide.dev/) are used under the ISC License. Copyright (c) Lucide Contributors 2022.
- Icons from [Font Awesome](https://fontawesome.com/) are used under
  the [Font Awesome Free License](https://fontawesome.com/license/free).

## License

[MIT](LICENSE)