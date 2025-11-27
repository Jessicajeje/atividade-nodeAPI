const http = require('http');
const https = require('https');

http.createServer((req, res) => {
    const apiUrl = 'https://dog.ceo/api/breeds/image/random';

    https.get(apiUrl, (apiRes) => {
        let data = '';

        apiRes.on('data', chunk => data += chunk);

        apiRes.on('end', () => {
            try {
                const json = JSON.parse(data);
                const imageUrl = json.message;

                const parts = imageUrl.split('/');
                const breedIndex = parts.indexOf('breeds') + 1;
                const breed = parts[breedIndex] || 'Desconhecida';

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<h1>Cachorro Aleatório - Dog API</h1>');

                res.write(`<h2>Raça: ${breed}</h2>`);

                res.write(`<img src="${imageUrl}" alt="Cachorro da raça ${breed}" width="300">`);

                res.end();
            } catch (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro ao processar dados da API');
            }
        });

    }).on('error', (err) => {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Erro na requisição à API');
    });

}).listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
