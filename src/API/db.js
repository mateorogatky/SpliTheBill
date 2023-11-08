const express = require('express');
const app = express();
const port = 3000; // Puerto en el que se ejecutará el servidor
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const db = pgp('postgresql://postgres:uruguay3260@localhost:5432/SplitTheBill');

app.use(bodyParser.json());

// Ruta para agregar un nuevo gasto
app.post('/api/expenses', async (req, res) => {
  const { nameExpense, price, count } = req.body;

  if (!nameExpense || !price || !count ) {
    return res.status(400).json({ error: 'Name, price and quantity are required fields' });
  } 

  try {
    const newExpense = await db.one('INSERT INTO expenses (name, price, count) VALUES ($1, $2, $3) RETURNING *', [nameExpense, price, count]);
    res.json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding a new expense' });
  }
});

// Ruta para eliminar un gasto por su nombre
app.delete('/api/expenses/:name', async (req, res) => {
  const name = req.params.name; // Obtén el nombre del gasto desde la URL

  try {
    // Realiza una consulta SQL para verificar si el gasto existe en la base de datos
    const expenseExists = await db.oneOrNone('SELECT name FROM expenses WHERE name = $1', name);

    if (expenseExists) {
      // Si el gasto existe, procede con la eliminación
      await db.none('DELETE FROM expenses WHERE name = $1', name);
      res.json({ message: `Expense with name: ${name} successfully removed` });
    } else {
      // Si el gasto no existe, devuelve un mensaje de error
      res.status(404).json({ error: 'The expense does not exist in the database' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});


// Ruta para obtener la lista de gastos
app.get('/api/expenses', async (req, res) => {
    try {
      const expenses = await db.any('SELECT * FROM expenses');
      console.log(expenses);
      res.json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining expenses' });
    }
  });
  
  // Ruta para obtener lista de nombres

  app.get('/api/names', async (req, res) => {
    try {
      const names = await db.any('SELECT * FROM names');
      res.json(names);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obtaining expenses' });
    }
  });
  app.post('/api/names', async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Name is a required field' });
    } 
  
    try {
      const newName = await db.one('INSERT INTO names (name) VALUES ($1) RETURNING *', [name]);
      
      // Envía una respuesta de éxito con el nuevo nombre agregado
      res.json({ message: 'Name added successfully', newName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error adding new name' });
    }
  });
  app.delete('/api/names/:name', async (req, res) => {
    const name = req.params.name; // Obtén el nombre desde la URL
  
    try {
      // Realiza una consulta SQL para verificar si el nombre existe en la base de datos
      const nameExists = await db.oneOrNone('SELECT name FROM names WHERE name = $1', name);
  
      if (nameExists) {
        // Si el nombre existe, procede con la eliminación
        await db.none('DELETE FROM names WHERE name = $1', name);
        res.json({ message: `Name: ${name} successfully removedombre` });
      } else {
        // Si el nombre no existe, devuelve un mensaje de error
        res.status(404).json({ error: 'The name does not exist in the database' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete name' });
    }
  });
  
  
  
  
  
  

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

