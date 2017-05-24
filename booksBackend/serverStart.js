const port = 7777;
const user = "bookreader"
const password = "123"
let app = require("./app");
app.initMongoose(`mongodb://${user}:${password}@ds137271.mlab.com:37271/booksrp`);
app.listen(port,() => console.log(`Started Server Listening on ${port}`));