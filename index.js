const express =  require('express')
const cors = require('cors')

const db = require('./models')

const app = express()

const corsSetting = {
    origin: "http://localhost:5000"
  };

app.use(cors(corsSetting));
app.use(express.json())


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.sequelize.sync();
app.listen(5000, () => { console.log('working')})
