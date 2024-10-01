import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {PrismaClient} from "@prisma/client";

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
})

// database

app.post("/users", async (req, res) => {
  try {
    const { name, email, phone, address, suburb } = req.body;
    const maxOrder = await prisma.user.aggregate({
      _max: {
        order: true,
      },
    });
    const newOrder = (maxOrder._max.order || 0) + 1;

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
        suburb: suburb,
        order: newOrder,
        date: new Date()
      }
    });
    res.status(201).json(user);
  } catch(error) {
    res.status(500).json({ error: {error} });
    console.log(error)
  }})

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: {error} });
  }
});

