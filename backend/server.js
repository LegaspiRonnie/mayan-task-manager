const express = require('express');
const cors    = require('cors');
const app     = express();
const PORT    = 3000;

//________________________________________________________________________________________
//___________________________ MIDDLEWARE _________________________________________________
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


//________________________________________________________________________________________
//___________________________ ROUTES  ____________________________________________________
const tasksRoutes = require('./routes/Tasks');
app.use('/api', tasksRoutes);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
