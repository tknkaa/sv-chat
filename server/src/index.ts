import { Hono } from "hono"
import { createBunWebSocket } from "hono/bun"
import { type ServerWebSocket } from "bun"

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()

type Message = {
    text: string,
}

const messages: Message[] = [
    { text: "Hello" }
]

const chatRoom = "chat-room"

const app = new Hono()

app.get("/", (c) => {
    return c.text("Hello Hono")
})

app.post("/messages", async (c) => {
    const message = await c.req.json();
    messages.push(message.text);
    console.log(messages);
})

app.get(
    "/ws",
    upgradeWebSocket((c) => {
        return {
            onOpen(_event, ws) {
                ws.raw?.subscribe(chatRoom);
            },
            onClose: (_event, ws) => {
                ws.raw?.unsubscribe(chatRoom);
            },
        }
    })
)

export default {
    fetch: app.fetch,
    websocket
}