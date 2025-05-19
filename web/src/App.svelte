<script lang="ts">
  import { onMount } from "svelte";

  let socket: null | WebSocket = null;
  let message = "";

  onMount(() => {
    socket = new WebSocket("ws://localhost:3000/ws");
    socket.onopen = () => {
      console.log("socket connected");
    };
    socket.onmessage = (event) => {
      message = event.data;
    } 
  })
</script>

<div>message: {message}</div>
<button onclick={() => socket?.send("hello from client")}>send</button>