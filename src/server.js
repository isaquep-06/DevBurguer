import app from './app.js'; // importando app = express
import User from './app/models/User.js';
const port = 3000;

app.get('/', (req, res) => {
  res.send('aloooow');
});



app.listen(port, () =>
  console.log(`Servidor rodando na porta http://localhost:${port}/`),
);
