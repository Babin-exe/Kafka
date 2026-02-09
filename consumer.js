import kafka from "./client.js";

const group = process.argv[2];

async function consume() {
  const consumer = kafka.consumer({ groupId: group });

  await consumer.connect();
  console.log("Consumer connected");

  await consumer.subscribe({ topic: "rider-updates" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      const key = message.key ? message.key.toString() : null;
      const value = message.value.toString();
      console.log(
        `Group : ${group} :[${topic}] Partition:${partition} Key:${key} Value:${value}`
      );
    },
  });
}

consume().catch((err) => {
  console.error("Error in the consumer function:", err);
});
