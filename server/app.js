const express = require('express');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const toastr = require('express-toastr')
const path = require('path');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
var hbs = require('express-hbs');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser('secret'));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(flash());
app.use(toastr());
app.use(express.static(path.join(__dirname, 'public')));

// app.engine('hbs', hbs.express4({
//     partialsDir: __dirname + '/views/partials'
// }));
// app.set('view engine', 'hbs');

var handlebars = require('express-handlebars').create({
    defaultLayout: false,
    partialsDir: path.join(__dirname, "views/partials"),
    extname: 'hbs',
        runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers:{ 
        "ifEquals" : function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        "ifNotEquals": function(arg1, arg2, options) {
            return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
        },
        "ifGreater": function(arg1, arg2, options) {
            return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
        },
    }
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(fileUpload());
i18next.use(Backend).use(middleware.LanguageDetector)
.init({ fallbackLng: 'en', backend: { loadPath : './Helpers/locales/{{lng}}/translation.json' } });
app.use(middleware.handle(i18next));
require('./routes')(app);
app.listen(process.env.PORT, (err) => {
    if(!err){ console.log(`listening on port ${process.env.PORT}`); }
    else{ console.log(`error occoured ${err}`); }
});