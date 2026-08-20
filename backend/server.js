require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const app     = express();
const PORT    = process.env.PORT || 3000;

//________________________________________________________________________________________
//___________________________ MIDDLEWARE _________________________________________________
app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());


//________________________________________________________________________________________
//___________________________ ROUTES  ____________________________________________________
const tasksRoutes = require('./routes/Tasks');
app.use('/api', tasksRoutes);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
