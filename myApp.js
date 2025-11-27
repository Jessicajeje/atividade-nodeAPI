const http = require('http');
const https = require('https');

http.createServer((req, res) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';

    https.get(apiUrl, (apiRes) => {
        let data = '';

        apiRes.on('data', chunk => data += chunk);

        apiRes.on('end', () => {
            try {
                const posts = JSON.parse(data);

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<h1>Posts do Usuário 1</h1>');

                posts.forEach(post => {
                    res.write(`<h2>${post.title}</h2>`);
                    res.write(`<p>${post.body}</p>`);
                });

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
