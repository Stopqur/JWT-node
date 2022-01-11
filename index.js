const express =  require('express')
const cors = require('cors')

const db = require('./models')
const authRouter = require('./routes/auth.routes')
const app = express()
const corsSetting = {
    origin: "http://localhost:5000"
  };

app.use(cors(corsSetting));
app.use(express.json())
app.use('', (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/auth', authRouter)
// require('./routes/auth.routes')(app);

db.sequelize.sync();
app.listen(5000, () => { console.log('working')})
