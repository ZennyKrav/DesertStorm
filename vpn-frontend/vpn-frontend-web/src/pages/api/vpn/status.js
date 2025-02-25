export default async function handler(req, res) {
    if (req.method === "GET") {
      try {
        const response = await fetch("https://your-vpn-api.com/status", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
          },
        });
  
        const data = await response.json();
        return res.status(response.status).json(data);
      } catch (error) {
        return res.status(500).json({ message: "Failed to fetch VPN status", error });
      }
    }
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  