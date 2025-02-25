import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { key } = req.body;

    // Load keys.json file
    const filePath = path.join(process.cwd(), "data", "keys.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const { validKeys } = JSON.parse(fileData);

    // Check if the key is valid
    if (validKeys.includes(key)) {
      return res.status(200).json({ success: true, message: "Key is valid" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid encryption key" });
    }
  } catch (error) {
    console.error("Error reading keys.json:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
