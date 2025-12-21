
const pdfLib = require('pdf-lib');
console.log('Exports:', Object.keys(pdfLib));
const { PDFDocument } = pdfLib;
console.log('PDFDocument prototype keys:', Object.getOwnPropertyNames(PDFDocument.prototype));
