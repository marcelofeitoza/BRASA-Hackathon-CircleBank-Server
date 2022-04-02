const fs = require("fs");

module.exports = function (app) {
	fs.readdirSync(__dirname).forEach(function (file) {
		if (file == "index.js") return;
		let name = file.substring(0, file.indexOf("."));
		const route = require("./" + name);
		app.get(`/${route.name}`, async (req, res) => {
			route.run(req, res);
		});
	});
};
