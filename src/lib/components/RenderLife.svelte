<script>
  import params from "$lib/params";
  import { onMount } from "svelte";

  export let data;

  let canvas, ctx, canvasData;

  onMount(() => {
    ctx = canvas.getContext("2d");
    canvasData = ctx.createImageData($params.rows, $params.cols);
  });

  const render = () => {
    if (!ctx) {
      return;
    }

    data.forEach((val, i) => {
      canvasData.data[i * 4] = val === 1 ? 0 : 255;
      canvasData.data[i * 4 + 1] = val === 1 ? 0 : 255;
      canvasData.data[i * 4 + 2] = val === 1 ? 0 : 255;
      canvasData.data[i * 4 + 3] = 255;
    });

    ctx.putImageData(canvasData, 0, 0);
  };

  $: data, render();
</script>

<canvas bind:this={canvas} width={$params.cols} height={$params.rows} />

<style>
  canvas {
    border: 1px solid black;
  }
</style>
