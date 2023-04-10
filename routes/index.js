"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: "" });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: "" });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: "about", displayName: "" });
});
router.get('/products', function (req, res, next) {
    res.render('index', { title: 'Our Products', page: "products", displayName: "" });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: "services", displayName: "" });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: "contact", displayName: "" });
});
router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add Contact', page: "edit",
        contact: '', displayName: "" });
});
router.post('/add', function (req, res, next) {
    let newContact = new user_1.default({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    user_1.default.create(newContact).then(function (contactToEdit) {
        res.redirect("/contactlist");
    }).catch(function (err) {
        console.error("failed to add contact" + err);
        res.end();
    });
});
router.get('/contactlist', function (req, res, next) {
    user_1.default.find().then(function (data) {
        res.render('index', {
            title: 'Contact List', page: "contactlist",
            contacts: data, displayName: ""
        });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
});
router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;
    user_1.default.deleteOne({ _id: id }).then(function (contactToEdit) {
        res.redirect("/contactlist");
    }).catch(function (err) {
        console.error("failed to delete contact from database" + err);
        res.end();
    });
});
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    user_1.default.findById(id).then(function (contactToEdit) {
        res.render('index', { title: 'Edit', page: "edit",
            contact: contactToEdit, displayName: "" });
    }).catch(function (err) {
        console.error("failed to retrieve contact from Database" + err);
        res.end();
    });
});
router.post('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new user_1.default({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    user_1.default.updateOne({ _id: id }, updatedContact).then(function (contactToEdit) {
        res.redirect("/contactlist");
    }).catch(function (err) {
        console.error("failed to edit contact" + err);
        res.end();
    });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: "login", displayName: "" });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: "register", displayName: "" });
});
exports.default = router;
//# sourceMappingURL=index.js.map