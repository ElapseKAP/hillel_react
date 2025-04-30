/**
 * Truncate text by defined max length
 *
 * @param maxLength number
 * @param text string
 *
 * @return string
 */
function truncateText( text, maxLength = 150 ) {
    let truncateText = '';
    const punctuations = [ '.', ',', ':', ';' ];

    if ( ! text || text.length < maxLength ) {
        return text;
    }

    truncateText = text.substring( 0, maxLength );
    let lastSpaceIndex = truncateText.lastIndexOf( ' ' );
    if ( lastSpaceIndex > 0 ) {
        truncateText = truncateText.substring( 0, lastSpaceIndex );
    }

    if ( punctuations.includes( truncateText.slice(-1) ) ) {
        truncateText = truncateText.slice(0, -1);
    }

    return truncateText + '...';
}

export { truncateText };