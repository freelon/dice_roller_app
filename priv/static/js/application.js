(() => {
    class myWebsocketHandler {
        setupSocket() {
            this.socket = new WebSocket("ws://localhost:4000/ws/chat")

            this.socket.addEventListener("message", (event) => {
                console.log(event)

                const pTag = document.createElement("p")
                pTag.innerHTML = event.data

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