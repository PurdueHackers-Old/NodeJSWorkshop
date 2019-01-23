const express = require('express');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const { PORT } = require('./config');
const { extractUser, passportMiddleware } = require('./middleware/passport');
const books = require('./routes/books');
const auth = require('./routes/auth');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportMiddleware(passport).initialize());
app.use(extractUser());

app.use('/api/books', books);
app.use('/api/auth', auth);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
