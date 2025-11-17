import { parse } from 'path';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function getMetadata(filePath) {
  const fileBuffer = await readFileSync(filePath);
  const parsedPath = parse(filePath);
  const fileExtension = parsedPath.ext;
  const fileContent = fileBuffer.toString();

  if (fileExtension === '.json') {
    try {
      const jsonMetadata = JSON.parse(fileContent);
      return {
        ...parsedPath,
        extension: fileExtension,
        content: jsonMetadata,
      };
    } catch (error) {
      throw new Error(`Invalid JSON metadata at ${filePath}`);
    }
  } else if (fileExtension === '.md') {
    try {
      const mdMetadata = markdown.parse(fileContent);
      return {
        ...parsedPath,
        extension: fileExtension,
        content: mdMetadata,
      };
    } catch (error) {
      throw new Error(`Invalid Markdown metadata at ${filePath}`);
    }
  } else {
    return {
      ...parsedPath,
      extension: fileExtension,
      content: fileContent,
    };
  }
}