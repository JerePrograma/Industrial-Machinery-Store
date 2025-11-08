import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const SEOMetadata = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogUrl 
}) => {
  const siteTitle = 'Helfer Maquinaria | Industrial Machinery Store';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Tienda especializada en maquinaria industrial nueva y usada. Encuentra excavadoras, tornos CNC, prensas hidráulicas y más.';
  const defaultKeywords = 'maquinaria industrial, maquinaria usada, maquinaria nueva, excavadoras, tornos CNC, prensas hidráulicas';
  const defaultOgImage = '/src/assets/logo.png';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl || window.location.href} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultOgImage} />

      {/* Instagram */}
      <meta property="instagram:url" content={ogUrl || window.location.href} />
      <meta property="instagram:title" content={fullTitle} />
      <meta property="instagram:description" content={description || defaultDescription} />
      <meta property="instagram:image" content={ogImage || defaultOgImage} />
    </Helmet>
  );
};

SEOMetadata.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string
};

export default SEOMetadata;