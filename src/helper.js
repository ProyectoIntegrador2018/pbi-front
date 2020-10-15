if (process.env.NODE_ENV === "production") {
	module.exports.baseURL = "https://pbi-mty.herokuapp.com";
} else {
	module.exports.baseURL = "http://localhost:3000";
}
