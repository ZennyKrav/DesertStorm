export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const response = await fetch("https://your-vpn-api.com/disconnect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${req.body.token}`,
          },
        });
  
        const data = await response.json();
        return res.status(response.status).json(data);
      } catch (error) {
        return res.status(500).json({ message: "Disconnection failed", error });
      }
    }
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  