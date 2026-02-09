import kafka from "./client.js";

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin connection success");

  console.log("Creating topic : [rider-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic creating success");
  console.log("Disconnecting the admin....");
  await admin.disconnect();
}
init()
  .then(() => {
    console.log("Admin script running successfully");
  })
  .catch((err) => {
    console.error("Error in the admin script : ", err);
  });
