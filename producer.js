const { Kafka } = require("kafkajs");
const readline = require("readline");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.1.35:9092"],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting producer...");
  await producer.connect();
  console.log("Producer connected...");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ name: riderName, loc: location }),
        },
      ],
    });
  }).on("close", async function () {
    await producer.disconnect();
  });
}

init();
