(() => {
    class myWebsocketHandler {
        setupSocket() {
            this.socket = new WebSocket("ws://localhost:4000/ws/chat")

            this.socket.addEventListener("message", (event) => {
                console.log(event)

                const eventContent = JSON.parse(event.data)

                const pTag = document.createElement("p")
                pTag.className = "chatEntry"
                const namePart = document.createElement("p")
                namePart.className = "name"
                namePart.innerHTML = eventContent.name + ":"
                pTag.append(namePart)

                const messagePart = document.createElement("p")
                messagePart.className = "messagePart"
                pTag.append(messagePart)
                const request = document.createElement("p")
                request.className = "request"
                messagePart.append(request)
                const message = document.createElement("p")
                message.className = "message"
                messagePart.append(message)

                if (eventContent.diceResults == null) {
                    message.innerHTML = eventContent.message
                } else {
                    message.innerHTML = eventContent.diceResults
                    request.innerHTML = eventContent.message
                }

                document.getElementById("main").prepend(pTag)
            })

            this.socket.addEventListener("close", () => {
                this.setupSocket()
            })
        }

        submit(event, msg) {
            event.preventDefault()
            var message
            const name = document.getElementById("name").value
            if (msg == null) {
                const input = document.getElementById("message")
                message = input.value
                input.value = ""
            } else {
                message = msg
            }

            this.socket.send(
                JSON.stringify({
                    data: {
                        message: message,
                        name: name
                    },
                })
            )
        }
    }

    const websocketClass = new myWebsocketHandler()
    websocketClass.setupSocket()

    document.getElementById("button_chat")
        .addEventListener("click", (event) => websocketClass.submit(event))
    document.getElementById("button_3d6")
        .addEventListener("click", (event) => websocketClass.submit(event, "3d6"))
    document.getElementById("button_1d6")
        .addEventListener("click", (event) => websocketClass.submit(event, "1d6"))
    document.getElementById("button_1d3")
        .addEventListener("click", (event) => websocketClass.submit(event, "1d3"))
})()