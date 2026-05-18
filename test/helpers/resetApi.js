const API_URL = process.env.API_URL || 'https://senai-testes-sistema.onrender.com/api';

async function resetDatabase() {
  const response = await fetch(`${API_URL}/reset`, {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error(`Erro ao resetar API. Status: ${response.status}`);
  }
}

module.exports = { resetDatabase };
