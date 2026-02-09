import kafka from "./client.js";
import { Partitioners } from "kafkajs";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function produce() {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });
  console.log("Connecting producer...");
  await producer.connect();
  console.log("Producer connected");

  rl.setPrompt(">");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "Location Update",
          value: JSON.stringify({ name: riderName, rider_Loaction: location }),
        },
      ],
    });
  }).on("close", async () => {
    console.log("Message sent successfully");
    await producer.disconnect();
  });
}

produce().catch((err) => {
  console.error("Error in the producer function:", err);
});
