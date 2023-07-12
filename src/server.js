import http from 'node:http'

const users = []

const server = http.createServer(async(req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const body = Buffer.concat(buffers).toString()
  
  console.log(body)

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    });
    
    return res.writeHead(201).end()
  }

  return res
    .writeHead(404)  
    .end('Not Found')
})

server.listen(3333)
