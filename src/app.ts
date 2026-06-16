import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import indexRouter from './routes/index.js';
//ajouter ici les fichiers route lorsque je les créer pour que index.js y ai acces
import hiraganaRouter from './routes/hiragana.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import progressRouter from './routes/progress.js'

const app = express();

app.use(cors())

app.use(express.json());

app.listen(4000, () => {
    console.log("Server running port 4000");
});


app.use('/', indexRouter);
// ajouter ici les routes 
app.use('/hiragana', hiraganaRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/progress', progressRouter)



export default app;
