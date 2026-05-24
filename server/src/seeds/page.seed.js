const Page = require("../models/page.model");

const seedPages = async () => {
  await Page.updateOne(
    { slug: "rules" },
    {
      slug: "rules",
      title: "Forum Rules",
      content: "Write your rules here...",
    },
    { upsert: true }
  );

  await Page.updateOne(
    { slug: "guidelines" },
    {
      slug: "guidelines",
      title: "Forum Guidelines",
      content: "Write your guidelines here...",
    },
    { upsert: true }
  );

  console.log("Pages seeded");
};

module.exports = seedPages;