const express = require('express');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { PORT } = require('./config');
const { extractUser, passportMiddleware } = require('./middleware/passport');
const v1 = require('./routes/v1');
const v2 = require('./routes/v2');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passportMiddleware(passport).initialize());
app.use(extractUser());

app.use('/v1', v1);
app.use('/v2', v2);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
