import { Hono } from "hono"
import { createBunWebSocket } from "hono/bun"
import { type ServerWebSocket } from "bun"

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()

type Message = {
    message: string,
}

const messages: Message[] = [
    { message: "Hello" }
]

const app = new Hono()

app.get("/", (c) => {
    return c.text("Hello Hono")
})

app.get(
    "/ws",
    upgradeWebSocket((c) => {
        return {
            onMessage(event, ws) {
                messages.push({
                    message: String(event.data)
                })
                ws.send(JSON.stringify(messages))
            },
            onClose: () => {
                console.log("Connection closed")
            },
        }
    })
)

export default {
    fetch: app.fetch,
    websocket
}