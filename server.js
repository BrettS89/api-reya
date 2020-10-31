require('module-alias/register');
const app = require('./src');

app.listen(process.env.PORT, () => {
  console.log('server listeningn on port 4000');
});
