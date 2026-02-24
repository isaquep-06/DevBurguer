module.exports = {
  dialect: 'postgres', // Qual banco de dados vamos usar?  <----
  host: 'localhost', // Qual tipo de conecxão?  <----
  port: 5432, // A porta da nossa conecxão?  <-----
  username: 'admin', // Nome do usuario para acessar?  <----
  password: '123456', // Senha do usuario para acessa?  <----
  database: 'dev-burguer-db', // Nome do banco de dados?  <-----
  define: {
    timestamps: true, // Data de criação, Data de atualização.
    underscored: true,
    underscoredAll: true,
  },
};
