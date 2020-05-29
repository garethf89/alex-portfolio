/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const SEO = ({ pageTitle, pageDescription, pageImage }) => {
    const { siteUrl, image, title, description } = useSiteMetadata()

    const metaDescription = pageDescription || description
    const metaImage = pageImage || image

    const titleTemplate =
        pageTitle && pageTitle !== title
            ? `${title} | ${pageTitle}`
            : `${title}`

    const isHome = pageTitle === title

    return (
        <Helmet
            htmlAttributes={{
                lang: `en`,
            }}
            title={title}
            defaultTitle={title}
            titleTemplate={titleTemplate}
        >
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />

            <link rel="canonical" href={siteUrl} />
            {/* General tags */}
            <meta name="image" content={image} />
            <meta name="description" content={metaDescription} />

            {/* OpenGraph tags */}
            <meta property="og:title" content={title} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:description" content={metaDescription} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:description" content={metaDescription} />
            {isHome && (
                <script type="application/ld+json">{`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Alex Ionna",
                "url": "http://www.alexionna.co.uk",
                "logo": "http://www.alexionna.co.uk/icons/icon-48x48.png",
                "sameAs": "http://WWW.TODO.CO.UK"
              }
             `}</script>
            )}
        </Helmet>
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
}

export default SEO
