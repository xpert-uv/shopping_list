
const express = require("express");
const router = new express.Router();
const expressError = require("./expressError");
const shoppingList = require('./fakeDb');



router.get('/', (req, res) => {
    res.status(200).json({ shoppingList });
})

router.post("/", function (req, res, next) {
    try {
        if (!req.body.name || !req.body.price) throw new expressError("Name is required", 400);
        const item = { name: req.body.name, price: req.body.price };
        shoppingList.push(item);
        return res.status(201).json({ added: item });
    } catch (e) {
        return next(e);
    }
})

router.get("/:name", function (req, res) {

    const founditem = shoppingList.find(item => item.name === req.params.name);
    console.log(founditem);
    if (founditem === undefined) {
        throw new expressError("Item not found", 404);
    } else {
        res.json({ items: founditem });
    }


})

router.patch("/:name", function (req, res) {
    const founditem = shoppingList.find(item => item.name === req.params.name);
    if (founditem === undefined) {
        throw new expressError("Item not found", 404);
    }
    founditem.name = req.body.name;
    founditem.price = req.body.price;
    res.json({ shoppingList: founditem });
})

router.delete("/:name", function (req, res) {
    const founditem = shoppingList.findIndex(item => item.name === req.params.name);
    if (!founditem) {
        throw new expressError("Item not found", 404)
    }
    shoppingList.splice(founditem, 1)
    res.json({ message: "Deleted" })
})

module.exports = router;