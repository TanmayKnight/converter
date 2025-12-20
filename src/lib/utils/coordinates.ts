
/**
 * Utility to convert screen coordinates (pixels of the rendered canvas)
 * to PDF coordinates (points inside the PDF file).
 */

export interface CoordinateMapping {
    x: number;
    y: number;
    width: number;
    height: number;
    pageIndex: number;
}

/**
 * @param screenX - X position of element on screen (relative to page container)
 * @param screenY - Y position of element on screen (relative to page container)
 * @param screenWidth - Width of the element on screen
 * @param screenHeight - Height of the element on screen
 * @param pdfPageWidth - Actual width of the PDF page in points
 * @param pdfPageHeight - Actual height of the PDF page in points
 * @param renderWidth - Width of the rendered canvas/image on screen
 * @param renderHeight - Height of the rendered canvas/image on screen
 */
export function mapToPdfCoordinates(
    screenX: number,
    screenY: number,
    screenWidth: number,
    screenHeight: number,
    pdfPageWidth: number,
    pdfPageHeight: number,
    renderWidth: number,
    renderHeight: number
): { x: number; y: number; width: number; height: number } {

    // Calculate the ratio between the rendered size and actual PDF size
    const scaleX = pdfPageWidth / renderWidth;
    const scaleY = pdfPageHeight / renderHeight;

    // Map Coordinates
    // NOTE: PDF coordinates usually start from Bottom-Left, but pdf-lib handles this
    // if we act as if it's top-left and then invert Y during embedding if native.
    // However, pdf-lib's drawImage uses (x, y) from bottom-left by default.
    // We will calculate top-left relative here, and let the embedding logic handle the inversion
    // or we return standard top-left relative to PDF size.

    const pdfX = screenX * scaleX;

    // In PDF-Lib, Y is from bottom. 
    // Screen Y is from top.
    // y_pdf = height_pdf - (y_screen * scale_y) - (height_screen * scale_y)
    const pdfY = pdfPageHeight - (screenY * scaleY) - (screenHeight * scaleY);

    const pdfWidth = screenWidth * scaleX;
    const pdfHeight = screenHeight * scaleY;

    return {
        x: pdfX,
        y: pdfY,
        width: pdfWidth,
        height: pdfHeight
    };
}
