const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.1.35:9092"],
});

async function init() {
  const admin = kafka.admin();

  console.log("Admin connecting...");
  admin.connect();
  console.log("Admin connecting success...");

  console.log("Creating topic [rider-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic created success [rider-updates]");

  console.log("Disconnecting admin...");
  await admin.disconnect();
}

init();
