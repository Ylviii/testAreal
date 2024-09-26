const express = require('express');
const app = express();
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(express.json());
app.use('/article', articleRoutes);
app.use('/article/:articleId/comment', commentRoutes);
app.use('/analytic', analyticRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});