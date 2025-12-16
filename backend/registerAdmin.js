
let fetchFn;
try {
  fetchFn = fetch;
} catch {
  fetchFn = require('node-fetch');
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

const registerAdmin = async () => {
  try {
    const email = await askQuestion('Enter admin email: ');
    const password = await askQuestion('Enter admin password: ');
    const name = await askQuestion('Enter admin name: ');

    rl.close();

    const response = await fetchFn(`${process.env.VITE_API_URL}/api/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    const data = await response.json();
    console.log('Admin registration response:', data);
  } catch (err) {
    console.error('Error:', err);
    rl.close();
  }
};

registerAdmin();
