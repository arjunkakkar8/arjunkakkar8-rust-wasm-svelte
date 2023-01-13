<script>
  import WasmLife from "$lib/components/WasmLife.svelte";
  import JSLife from "$lib/components/JSLife.svelte";
</script>

<div>
  <WasmLife />
  <JSLife />
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
