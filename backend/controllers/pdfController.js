
const puppeteer = require('puppeteer');
const db = require("../config/sequelize");
const Supporter = db.supporters;
const path = require('path');
const fs = require('fs');

// Helper to convert image to base64
function imageToBase64(imagePath) {
  try {
    const fullPath = path.join(__dirname, '..', imagePath);
    if (fs.existsSync(fullPath)) {
      const imageBuffer = fs.readFileSync(fullPath);
      const base64 = imageBuffer.toString('base64');
      const ext = path.extname(imagePath).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/jpeg';
      return `data:${mimeType};base64,${base64}`;
    }
  } catch (err) {
    console.error('Error converting image to base64:', err);
  }
  return '';
}

async function generateIdCardHtml(supporter) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=REG:${encodeURIComponent(supporter.registrationNumber)}`;
  
  // Convert logo to base64
  const logoBase64 = imageToBase64('logo.jpeg');
  
  // Convert supporter photo to base64
  let photoBase64 = '';
  if (supporter.photoUrl) {
    photoBase64 = imageToBase64(supporter.photoUrl);
  }
  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>ID Card PDF</title>
      <style>
        body { background: #fff5f5; margin: 0; padding: 0; }
        .card {
          width: 700px;
          min-height: 1100px;
          margin: 40px auto;
          border-radius: 1rem;
          overflow: visible;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          border: 4px solid #e53935;
          background: linear-gradient(135deg, #fff5f5 0%, #fdeaea 100%);
          font-family: 'Segoe UI', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .header {
          background: linear-gradient(90deg, #e53935 0%, #b71c1c 100%);
          color: #fff;
          padding: 1rem 1.5rem;
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header img {
          height: 64px; width: 64px; border-radius: 50%; border: 2px solid #fff; object-fit: cover;
        }
        .header-title {
          flex: 1;
          text-align: center;
        }
        .header-title h2 {
          font-size: 2rem;
          font-weight: bold;
          letter-spacing: 2px;
          margin: 0;
        }
        .header-title p {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        .main {
          padding: 32px 24px;
          min-height: 900px;
        }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 24px;
        }
        .badge {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .badge-icon {
          background: #e5393520; border-radius: 50%; width: 128px; height: 128px; display: flex; align-items: center; justify-content: center;
        }
        .photo {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .photo-bg {
          position: absolute; inset: 0; background: linear-gradient(135deg, #fff5f5 0%, #fdeaea 100%); border-radius: 0.5rem; transform: rotate(3deg); z-index: 0;
        }
        .photo img {
          position: relative; z-index: 1; height: 320px; width: 256px; object-fit: cover; border-radius: 0.5rem; border: 4px solid #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .reg-badge {
          position: relative; margin-top: 16px;
        }
        .reg-badge-bg {
          position: absolute; inset: 0; background: #e53935; border-radius: 50%; transform: rotate(-6deg); z-index: 0;
        }
        .reg-badge-content {
          position: relative; background: #fff; border-radius: 50%; padding: 16px 32px; border: 4px solid #e53935; box-shadow: 0 2px 12px rgba(0,0,0,0.08); z-index: 1;
        }
        .reg-badge-content p { margin: 0; text-align: center; }
        .reg-label { font-size: 12px; color: #888; font-weight: 600; }
        .reg-number { font-size: 24px; color: #e53935; font-weight: bold; }
        .qr {
          background: #fff; padding: 12px; border-radius: 8px; border: 4px solid #e53935; box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .info-name {
          margin-top: 24px;
          background: #fff;
          border-radius: 2rem;
          padding: 24px;
          border: 4px solid #e53935;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          text-align: center;
          font-size: 28px;
          color: #e53935;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .info-details {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .info-detail {
          display: flex; align-items: center; gap: 12px;
          background: #fff5f5; border-radius: 12px; padding: 12px 24px; border: 2px solid #e5393520;
        }
        .icon {
          display: flex; align-items: center; justify-content: center; background: #e5393520; border-radius: 50%; width: 40px; height: 40px;
        }
        .info-label { font-size: 12px; color: #888; font-weight: 500; }
        .info-value { font-size: 16px; color: #222; font-weight: 600; }
        .footer {
          background: linear-gradient(90deg, #e53935 0%, #b71c1c 100%); color: #fff; text-align: center; padding: 12px 24px; font-size: 14px; margin-top: 24px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="header-content">
            <img src="${logoBase64}" alt="Logo" />
            <div class="header-title">
              <h2>KWANKWASIYYA</h2>
              <p>NORTHWEST MOVEMENT</p>
            </div>
            <img src="${logoBase64}" alt="Logo" />
          </div>
        </div>
        <div class="main">
          <div class="main-grid">
            <div class="badge">
              <div class="badge-icon">
                <!-- CheckCircle SVG -->
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
              </div>
            </div>
            <div class="photo">
              <div class="photo-bg"></div>
              <img src="${photoBase64}" alt="${supporter.fullName}" />
              <div class="reg-badge">
                <div class="reg-badge-bg"></div>
                <div class="reg-badge-content">
                  <p class="reg-label">REG NO</p>
                  <p class="reg-number">${supporter.registrationNumber}</p>
                </div>
              </div>
            </div>
            <div class="badge">
              <div class="qr">
                <img src="${qrCodeUrl}" alt="QR Code" style="width:96px;height:96px;" />
              </div>
            </div>
          </div>
          <div class="info-name-section" style="margin-top:24px;">
            <div style="background:#fff; border-radius:999px; padding:24px; border:4px solid #4caf50; box-shadow:0 2px 12px rgba(0,0,0,0.08); text-align:center;">
              <p style="font-size:1.5rem; font-weight:bold; color:#388e3c; text-transform:uppercase; letter-spacing:2px; margin:0;">${supporter.fullName}</p>
            </div>
          </div>
          <div class="info-details-section" style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.6); border-radius:12px; padding:16px 24px; border:2px solid #4caf5030;">
              <div style="height:40px; width:40px; border-radius:50%; background:#4caf5020; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <!-- MapPin SVG -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div style="min-width:0;">
                <p style="font-size:12px; color:#888; font-weight:500; margin:0;">Location</p>
                <p style="font-size:16px; font-weight:600; color:#222; margin:0;">${supporter.pollingUnit}, ${supporter.LG}</p>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.6); border-radius:12px; padding:16px 24px; border:2px solid #4caf5030;">
              <div style="height:40px; width:40px; border-radius:50%; background:#4caf5020; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <!-- Calendar SVG -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M8 2v4"></path><path d="M16 2v4"></path><path d="M3 10h18"></path></svg>
              </div>
              <div style="min-width:0;">
                <p style="font-size:12px; color:#888; font-weight:500; margin:0;">Registered</p>
                <p style="font-size:16px; font-weight:600; color:#222; margin:0;">${new Date(supporter.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">© 2025 Kwankwasiyya Northwest Movement. All rights reserved.</div>
      </div>
    </body>
  </html>
  `;
}

exports.generatePDF = async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    const type = req.query.type === 'image' ? 'image' : 'pdf';
    const supporter = await Supporter.findOne({ where: { registrationNumber } });
    if (!supporter) return res.status(404).json({ success: false, message: 'Supporter not found' });

    const html = await generateIdCardHtml(supporter);
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
        ],
        timeout: 60000
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 800, height: 1200 });
      
      // Set content with a longer timeout since we're using base64 images
      await page.setContent(html, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });

      if (type === 'image') {
        // Wait for card to render
        await page.waitForSelector('.card');
        // Get card bounding box
        const cardElement = await page.$('.card');
        const boundingBox = await cardElement.boundingBox();
        // Screenshot only the card
        const imageBuffer = await page.screenshot({
          type: 'png',
          clip: {
            x: Math.floor(boundingBox.x),
            y: Math.floor(boundingBox.y),
            width: Math.ceil(boundingBox.width),
            height: Math.ceil(boundingBox.height)
          }
        });
        await browser.close();
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename=${registrationNumber}_idcard.png`);
        res.send(imageBuffer);
      } else {
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${registrationNumber}_idcard.pdf`);
        res.send(pdfBuffer);
      }
    } catch (puppeteerError) {
      if (browser) await browser.close();
      console.error('Puppeteer error:', puppeteerError);
      res.status(500).json({ success: false, message: 'Puppeteer error', error: puppeteerError.message });
    }
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({ success: false, message: 'Controller error', error: err.message });
  }
};
