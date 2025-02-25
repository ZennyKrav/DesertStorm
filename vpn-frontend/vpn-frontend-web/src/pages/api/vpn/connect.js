export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const response = await fetch("https://your-vpn-api.com/connect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${req.body.token}`, // Ensure authentication
          },
          body: JSON.stringify({ server: req.body.server }),
        });
  
        const data = await response.json();
        return res.status(response.status).json(data);
      } catch (error) {
        return res.status(500).json({ message: "Connection failed", error });
      }
    }
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  