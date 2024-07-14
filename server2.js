import { createServer } from 'http';
const PORT = process.env.PORT;

const users = [
    {id: 1, name: 'Sujayraj Boregouda'},
    {id: 2, name: 'Gayatri Boregouda'},
    {id: 3, name: 'Swapna'},
]

// Loger Middleware
const logger = (req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

// JSON Middleware
const jsonMiddleWare = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

// Route Handler for /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

// Route Handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

    if (user) {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(user));
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'User not found'}));
    }
    res.end();
}

// Not Found Handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({message: 'Route not found'}));
    res.end();
}


const server = createServer((req, res) => { 
   logger(req, res, () => {
       jsonMiddleWare(req, res, () => {
            if(req.url === 'api/users' && req.method === 'GET') {
                getUsersHandler(req, res);
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
                getUserByIdHandler(req, res);
            } else {
                notFoundHandler(req, res);
            }
       })
    }) 
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})