const path = require('path');
const fs = require('fs-extra');

const iconsPath = './node_modules/heroicons';
const buildPath = './dist/icons';

const componentTemplate = (name, svg) => {
  return 'export default function() { \n' + '\treturn `' + svg + '`' + '\n};';
};

async function main() {
  const iconDirsPath = path.join(__dirname, iconsPath);
  const categories = ['outline', 'solid'];
  const icons = [];

  const categoryByOriginCategory = {
    outline: 'outline',
    solid: 'solid',
  };

  fs.removeSync(buildPath);

  for (const originCategory of categories) {
    const categoryPath = path.join(iconDirsPath, originCategory);
    const filenames = await fs.readdir(categoryPath);

    const iconsByCategory = filenames.map((filename) => {
      const [name] = filename.split('.');
      return {
        name,
        path: path.join(categoryPath, filename),
        category: categoryByOriginCategory[originCategory],
      };
    });

    icons.push(...iconsByCategory);
  }

  for (const icon of icons) {
    // Read svg as string
    const svg = await fs.readFile(icon.path, 'utf8');
    const filepath = `${buildPath}/${icon.category}/${icon.name}.js`;
    await fs.ensureDir(path.dirname(filepath));
    await fs.writeFile(filepath, componentTemplate(icon.name, svg), 'utf8');
  }
}

main().catch((err) => {
  console.error(err);
});
