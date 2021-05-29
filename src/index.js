const express = require("express");
const swaggerUI = require('swagger-ui-express');

const cors = require("./middleware/cors");
const router = require("./routes");
const swaggerDoc = require('./utils/swagger');

const app = express();

//只有加了这一行，req.body才能取数据。
app.use(express.json());

app.use(cors);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(router);

app.listen(3000, () => {
	console.log("localhost server listening on port 3000!");
});

