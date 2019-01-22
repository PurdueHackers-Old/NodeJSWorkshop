const express = require('express');
const { PORT } = require('./config');
const books = require('./routes/books');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/books', books);

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
