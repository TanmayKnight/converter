
const { PDFDocument } = require('pdf-lib-plus-encrypt');

async function test() {
    try {
        const pdfDoc = await PDFDocument.create();
        if (typeof pdfDoc.encrypt === 'function') {
            console.log('SUCCESS: encrypt is a function');
        } else {
            console.log('FAILURE: encrypt is NOT a function. It is:', typeof pdfDoc.encrypt);
        }
    } catch (e) {
        console.error('ERROR:', e);
    }
}

test();
