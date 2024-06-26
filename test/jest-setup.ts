import {afterAll} from '@jest/globals'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
 
const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]

const server = setupServer(...handlers)

server.listen()

afterAll(() => server.close())