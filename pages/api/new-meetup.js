//  /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://masoud:Yro77eIUz13KTX29@cluster0.h8yse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetup");
    const result = await meetupCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "meetup inserted!" });
  }
}

export default handler;


