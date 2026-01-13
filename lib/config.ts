/**
 * Application configuration
 * 
 * ENABLE_EXPERIMENTAL_FEATURES controls whether experimental features
 * like audio compression, YouTube download, and audio trimming are enabled.
 * 
 * Set to false for production to hide these features.
 */
export const ENABLE_EXPERIMENTAL_FEATURES = process.env.NODE_ENV === 'development';

/**
 * Check if we're in a production environment
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
