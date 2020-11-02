const handlers = require('@/utilities/handlers');
const throwError = require('@/utilities/throwError');
const accountAuth = require('@/utilities/accountAuth');
const { mp3FromString } = require('@/utilities/polly');
const { uploadTos3 } = require('@/utilities/s3');

const controller = async (req, res) => {
  try {
    const { _id } = accountAuth(req.header('authorization'));
    const text = req.body.text

    if (!text || typeof text !== 'string') {
      throwError(400, 'bad request data'); 
    }

    const data = await mp3FromString();
    const fileUrl = await uploadTos3(data.AudioStream);
    handlers.success(res, 201, { fileUrl });
  } catch(e) {
    handlers.error(res, e, '/partner/tts CREATE');
  }
};

module.exports = {
  controller,
  method: 'post',
  path: '/tts',
};
