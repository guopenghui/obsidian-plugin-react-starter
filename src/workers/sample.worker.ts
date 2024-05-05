setInterval(() => {
    postMessage(`I'm worker ${self.name}`)
}, 2000)