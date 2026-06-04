const fs = require("fs");
const path = require("path");

const dataFolder = path.join(
  __dirname,
  "../data"
);

const files = fs
  .readdirSync(dataFolder)
  .filter(
    (file) =>
      file.endsWith(".json") &&
      file !== "topics.json"
  );

files.forEach((file) => {

  const filePath = path.join(
    dataFolder,
    file
  );

  const content = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  // Only unwrap wrapped files
  if (
    content.success &&
    content.data
  ) {

    fs.writeFileSync(
      filePath,
      JSON.stringify(
        content.data,
        null,
        3
      )
    );

    console.log(
      `✅ Cleaned: ${file}`
    );
  }
});

console.log(
  "\n🎉 All topic files cleaned."
);