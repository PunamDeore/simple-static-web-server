const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3100;
const STATIC_FOLDER = path.join(__dirname, 'static');

const server = http.createServer((req, res) => {
    let filePath = path.join(STATIC_FOLDER, req.url === '/' ? 'index.html' : req.url);
    
    let extname = path.extname(filePath);

    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {

                fs.readFile(path.join(STATIC_FOLDER, '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            }
        } else {
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
