const fs = require("fs");
const path = require("path");

const dataFolder = path.join(
  __dirname,
  "../data"
);

const files = fs
  .readdirSync(dataFolder)
  .filter(
    file =>
      file.endsWith(".json") &&
      file !== "topics.json"
  );

files.forEach(file => {

  const filePath = path.join(
    dataFolder,
    file
  );

  const content = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  // Skip already normalized files
  if (content.sections) {
    console.log(
      `⏭ Already Normalized: ${file}`
    );
    return;
  }

  // Convert old schema
  if (content.content) {

    content.sections =
      content.content.map(section => ({
        title: section.title,
        sourceFile:
          section.sourceFile || "",
        rawCode:
          section.rawCode ||
          section.raw ||
          ""
      }));

    delete content.content;

    fs.writeFileSync(
      filePath,
      JSON.stringify(
        content,
        null,
        3
      )
    );

    console.log(
      `✅ Migrated: ${file}`
    );
  }

});

console.log(
  "\n🎉 Topic normalization complete."
);