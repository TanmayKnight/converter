
const { PDFDocument } = require('pdf-lib');

async function test() {
    try {
        const pdfDoc = await PDFDocument.create();
        if (typeof pdfDoc.encrypt === 'function') {
            console.log('SUCCESS: encrypt is a function');
        } else {
            console.log('FAILURE: encrypt is NOT a function. It is:', typeof pdfDoc.encrypt);
            console.log('Keys:', Object.keys(pdfDoc));
        }
    } catch (e) {
        console.error('ERROR:', e);
    }
}

test();
