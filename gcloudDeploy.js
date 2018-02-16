const Storage = require('@google-cloud/storage');
const fs = require('fs');
const { bucketNames, projectId, keyFilename } = require('./auth/deploySettings');

const buckets = [];
bucketNames.forEach((bucketName) => {
  console.log(`deploying to ${projectId}/${bucketName}`);
  buckets.push(
    Storage({
      projectId,
      keyFilename,
    }).bucket(bucketName)
  );
});

const emptyBucket = (cb) => {
  buckets.forEach((bucket) => {
    bucket.getFiles()
      .then((results) => {
        let index = 1;
        const files = results[0];
        if (files.length) {
          files.forEach((file) => {
            bucket.file(file.name).delete()
              .then(() => {
                console.log(`deleted ${file.name}`);
                index++;
                if (index === files.length) {
                  cb();
                }
              });
          });
        } else {
          console.log(`empty bucket`);
          cb();
        }
      })
      .catch(console.error);
  });
};

const uploadOptions = {
  'index.html': { public: true, metadata: { cacheControl: 'no-cache' }},
  'gz': {
    public: true,
    metadata: {
      cacheControl: 'no-cache',
      contentEncoding: 'gzip',
    },
  },
};

const uploadDist = () => {
  const distFiles = fs.readdirSync('./dist/');
  distFiles.forEach((file) => {
    const ext = file.substr(file.lastIndexOf('.') + 1);
    const options = ext === 'gz' ? uploadOptions['gz'] : uploadOptions[file] || { public: true };
    buckets.forEach((bucket) => {
      bucket.upload(`./dist/${file}`, options)
        .then(() => {
          console.log(`uploaded ${file}`);
        })
        .catch(console.error);
    });
  });
  const utilFiles = fs.readdirSync('./webUtils/');
  utilFiles.forEach((file) => {
    buckets.forEach((bucket) => {
      bucket.upload(`./webUtils/${file}`, { public: true })
        .then(() => {
          console.log(`uploaded ${file}`);
        })
        .catch(console.error);
    });
  });
};

emptyBucket(uploadDist);
