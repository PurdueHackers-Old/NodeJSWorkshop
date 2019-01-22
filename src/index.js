const express = require('express');
const passport = require('passport');
const { PORT } = require('./config');
const { extractUser, passportMiddleware } = require('./middleware/passport');
const books = require('./routes/books');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportMiddleware(passport).initialize());
app.use(extractUser());

app.use('/api/books', books);

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
