const AWS = require('aws-sdk');

const polly = new AWS.Polly({
  accessKeyId: process.env.POLLY_PUBLIC,
  secretAccessKey: process.env.POLLY_SECRET,
  region: 'us-east-1',
});

const mp3FromString = async str => {
  const params = {
    OutputFormat: 'mp3',
    Text: str,
    TextType: 'text',
    VoiceId: 'Salli',
    Engine: 'neural',
  };

  return new Promise((resolve, reject) => {
    polly.synthesizeSpeech(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = {
  mp3FromString,
};
