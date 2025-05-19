<script lang="ts">
  type Message = {
    userId: number,
    message: string,
  }

  const sampleMessages: Message[] = [
    {userId: 0, message: "Hello"},
    {userId: 1, message: "world"}
  ]
</script>

<div>Chats</div>

<ul>
  {#each sampleMessages as message}
    <li>{message.userId}: {message.message}</li>
  {/each}
</ul>
