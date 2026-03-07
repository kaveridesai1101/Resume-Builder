const puppeteer = require('puppeteer');

// @desc    Generate a PDF from HTML resume content sent from the frontend
// @route   POST /api/resume/pdf
// @access  Private
const generatePDF = async (req, res) => {
    try {
        const { htmlContent } = req.body;

        if (!htmlContent) {
            return res.status(400).json({ message: 'HTML content is required' });
        }

        // Launch puppeteer in headless mode
        // Note: in a constrained environment like shared hosting, this requires args: ['--no-sandbox', '--disable-setuid-sandbox']
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();

        // Emulate screen media
        await page.emulateMediaType('screen');

        // We inject the HTML and tell Puppeteer to format it specifically.
        // The HTML should ideally include the CSS stylesheets or inline styles.
        const styledHtml = `
      <html>
        <head>
          <style>
             body { margin: 0; padding: 0; background: white; font-family: 'Times New Roman', Times, serif; }
             /* Basic resets to match the Jake Resume output */
             .ats-resume-template h1, 
             .ats-resume-template h2, 
             .ats-resume-template h3, 
             .ats-resume-template p, 
             .ats-resume-template ul {
                color: black !important;
             }
             @page {
               margin: 0.4in;
             }
             * {
                box-sizing: border-box;
             }
          </style>
        </head>
        <body>
           <div class="ats-resume-template" style="color: #000; font-size: 11pt; line-height: 1.4;">
             ${htmlContent}
           </div>
        </body>
      </html>
    `;

        await page.setContent(styledHtml, { waitUntil: 'networkidle0' });

        // Generate PDF config
        const pdfBuffer = await page.pdf({
            format: 'Letter',
            printBackground: true,
            margin: {
                top: '0.4in',
                right: '0.4in',
                bottom: '0.4in',
                left: '0.4in'
            }
        });

        await browser.close();

        // Send PDF stream back
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': 'attachment; filename="Resume.pdf"'
        });

        res.end(pdfBuffer);

    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ message: 'Failed to generate PDF' });
    }
};

module.exports = {
    generatePDF,
};
