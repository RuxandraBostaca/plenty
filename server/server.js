var express = require("express");
var Sequelize = require("sequelize");

var app = express();
var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

app.set('view engine', 'hjs');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}); 

//connect to mysql database
var sequelize = new Sequelize('plentydb', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    operatorsAliases: false,
    define: { freezeTableName: true }
})

sequelize.authenticate().then(function(){
    console.log('Connected to database')
})

var Item = sequelize.define('item', {
    categoryId: Sequelize.INTEGER,
    name: Sequelize.STRING,
    price: Sequelize.STRING,
    quantity: Sequelize.STRING
})

var Category = sequelize.define('category', {
    name: Sequelize.STRING,
    position: Sequelize.INTEGER
})

var Menu = sequelize.define('menu', {
    date: Sequelize.STRING
})

var MapMenu = sequelize.define('map_menu', {
    menuId: Sequelize.INTEGER,
    itemId: Sequelize.INTEGER
})

Category.hasMany(Item);
Menu.belongsToMany(Item, {through: MapMenu, foreignKey: "menuId", targetKey: "id"});
Item.belongsToMany(Menu, {through: MapMenu, foreignKey: "itemId", targetKey: "id"});


app.get('/test/:id', function(request, response) {
    Menu.findAll({
        include: [{
            model: Item,
            through: {
                where: {menuId: request.params.id}
            }
        }]
    }).then(function(menu) {
        if(menu) {
            response.status(200).send(menu);
        } else {
            response.status(404).send();
        }
    })
})

app.listen(8080)