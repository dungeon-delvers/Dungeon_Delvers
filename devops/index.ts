import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';
import { execSync } from 'child_process';

const s3Client = new S3Client({ region: 'us-east-1' });
const bucketName = 'dungeon-delvers.net';

const buildDirectories = ['../auth', '../client', '../server'];

for (const dir of buildDirectories) {
  console.log(`Building project in ${dir}`);
  execSync('npm run build', { cwd: path.resolve(__dirname, dir), stdio: 'inherit' });
}

const directories = buildDirectories.map(dir => path.resolve(__dirname, dir));

async function uploadDirectory(directoryPath: string) {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      await uploadDirectory(filePath);
    } else {
      const fileContent = fs.readFileSync(filePath);
      const contentType = mime.lookup(filePath) || 'application/octet-stream';

      const uploadParams = {
        Bucket: bucketName,
        Key: path.relative('../', filePath),
        Body: fileContent,
        ContentType: contentType,
      };

      try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(`Successfully uploaded ${filePath} to ${bucketName}`);
      } catch (err) {
        console.error(`Error uploading ${filePath}:`, err);
      }
    }
  }
}

async function main() {
  for (const directory of directories) {
    await uploadDirectory(directory);
  }
}

main().catch(err => console.error('Error in main function:', err));
