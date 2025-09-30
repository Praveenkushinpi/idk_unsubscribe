import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import AudienceEmail from "@/models/AudienceEmail";
import WaitlistEmail from "@/models/WaitlistEmail";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
      // Remove from both collections
      await Promise.all([
        AudienceEmail.deleteOne({ email }),
        WaitlistEmail.deleteOne({ email }),
      ]);

      return res.status(200).json({ message: "You have been unsubscribed from all lists." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    const { email } = req.query;
    return res.status(200).send(`
      <html>
        <body>
          <h1>Unsubscribe from MockCrack</h1>
          <form method="POST">
            <input type="hidden" name="email" value="${email}" />
            <button type="submit">Unsubscribe from all lists</button>
          </form>
        </body>
      </html>
    `);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
