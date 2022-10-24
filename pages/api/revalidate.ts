import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  console.log({body:req.body, headers:req.headers})
  if(req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      message: "Invalid token"
    })
  }
  try {
    await res.revalidate("/products")
    return res.json({
      revalidated: true
    })
  } catch {
    return res.status(500).send("Error revalidating")
  }
}

export default handler