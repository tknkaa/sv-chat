import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import { cors } from "hono/cors";

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

type Message = {
    text: string;
};

const messages: Message[] = [{ text: "Hello" }];

const chatRoom = "chat-room";

const app = new Hono();

const server = Bun.serve({
    fetch: app.fetch,
    websocket,
});

app.use("/*", cors());

app.get("/", (c) => {
    return c.text("Hello Hono");
});

app.post("/message", async (c) => {
    const message: Message = await c.req.json();
    messages.push(message);
    server.publish(chatRoom, JSON.stringify(messages));
    return c.text("hoge");
});

app.get(
    "/ws",
    upgradeWebSocket((c) => {
        return {
            onOpen(event, ws) {
                ws.raw?.subscribe(chatRoom);
                ws.send(JSON.stringify(messages));
            },
            onClose: (event, ws) => {
                ws.raw?.unsubscribe(chatRoom);
            },
        };
    }),
);

export default app;
