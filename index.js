const express = require('express');
const books = require('./routes/books');

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/books', books);

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
