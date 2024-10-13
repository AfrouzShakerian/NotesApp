const http = require('http');
const fs = require('fs');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.json');

function readNotes() {
    try {
        const data = fs.readFileSync(notesFile, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (err) {
        return [];
    }
}

function saveNotes(notes) {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

function serveFile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, filePath);
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            console.error(`Error reading file: ${fullPath}`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function requestHandler(req, res) {
    if (req.method === 'GET') {
        if (req.url === '/') {
            serveFile(res, 'index.html', 'text/html');
        } else if (req.url === '/style.css') {
            serveFile(res, 'style.css', 'text/css');
        } else if (req.url === '/main.js') {
            serveFile(res, 'main.js', 'application/javascript');
        } else if (req.url === '/api/notes') {
            const notes = readNotes();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(notes));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/api/notes') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { title, content } = JSON.parse(body);
            const notes = readNotes();
            const newNote = { id: Date.now(), title, content };
            notes.push(newNote);
            saveNotes(notes);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newNote));
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/notes/')) {
        const id = req.url.split('/').pop();
        const notes = readNotes();
        const filteredNotes = notes.filter(note => note.id !== parseInt(id));
        saveNotes(filteredNotes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Note deleted' }));
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
}

const server = http.createServer(requestHandler);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
