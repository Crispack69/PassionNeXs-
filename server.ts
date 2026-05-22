import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for form submission
  app.post("/api/apply", async (req, res) => {
    try {
      const { 
        fullName, 
        contactNumber, 
        email, 
        age,
        role, 
        selectedNiches, 
        callTime, 
        whatsappTime 
      } = req.body;

      const apiKey = process.env.RESEND_API_KEY;
      const adminEmail = process.env.ADMIN_EMAIL;

      if (!apiKey || !adminEmail) {
        return res.status(500).json({ 
          error: "RESEND_API_KEY or ADMIN_EMAIL is not configured in the environment variables." 
        });
      }

      const resend = new Resend(apiKey);
      
      const emailContent = `
        <h2>New PassionNeXs Origin Application</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Niche:</strong> ${selectedNiches.join(', ')}</p>
        <p><strong>Preferred Call Time:</strong> ${callTime}</p>
        <p><strong>WhatsApp Availability:</strong> ${whatsappTime}</p>
      `;

      const data = await resend.emails.send({
        from: 'PassionNeXs Application <onboarding@resend.dev>',
        to: adminEmail,
        subject: `New Application from ${fullName}`,
        html: emailContent,
      });

      if (data.error) {
        throw new Error(data.error.message);
      }

      res.status(200).json({ success: true, message: "Application submitted successfully." });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error.message || "Failed to submit application." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
