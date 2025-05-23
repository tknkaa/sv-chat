<script lang="ts">
  import { onMount } from "svelte";

  type Message = {
    text: string;
  };

  let socket: null | WebSocket = null;
  let messages: Message[] = [];
  let newMessage = "";

  onMount(() => {
    socket = new WebSocket("ws://localhost:3000/ws");
    socket.onopen = () => {
      console.log("socket connected");
    };
    socket.onmessage = (event) => {
      messages = JSON.parse(event.data);
    };
  });
</script>

<ul>
  {#each messages as message}
    <li>{message.text}</li>
  {/each}
</ul>
<input bind:value={newMessage} />
<button
  onclick={async () => {
    await fetch("http://localhost:3000/message", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ text: newMessage }),
    });
    newMessage = "";
  }}>send</button
>
