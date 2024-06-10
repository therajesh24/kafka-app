const { Kafka } = require("kafkajs");
const group = process.argv[2];

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.1.35:9092"],
});

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  await consumer.connect();
  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${group}: [${topic}]: PARTITION:${partition}`,
        message.value.toString()
      );
    },
  });
}

init();
