const routes = require("express").Router();
const { getData, insert_result, filters } = require("./config/functions");

//set routes
routes.get('/result/:sf', async (req, res) => {
    const { sf } = req.params;
    const reg = await getData(sf);
    insert_result(reg);
    res.json(reg)
});

routes.get('/filter', (req, res) => {

    filters().then(function (rows) {
        res.json(rows)
    }).catch((err) => setImmediate(() => { throw err; })); 
});

//export varible routes
module.exports = routes;