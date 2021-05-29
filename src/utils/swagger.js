const swaggerJsDoc = require('swagger-jsdoc');

const options = {
	definition : {
		openapi: '3.0.0',
		info: {
			title: 'JR TODO api',
			version: '1.0.0',
			contact: {
				name: 'Tianyi',
				email: 'h.tianyi@outlook.com'
			}
		}
	},
	apis:['./src/controllers/*.js']
};

module.exports = swaggerJsDoc(options);