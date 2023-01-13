<script>
  import params from "$lib/params";

  export let data;

  const pixelWidth = $params.width / $params.cols;
  const pixelHeight = $params.height / $params.rows;

  let canvas;

  const render = () => {
    let ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.beginPath();
    data.forEach((val, i) => {
      const rowNum = Math.floor(i / $params.cols);
      const colNum = i % $params.cols;
      ctx.fillStyle = val === 1 ? "black" : "white";
      ctx.fillRect(
        colNum * pixelWidth,
        rowNum * pixelHeight,
        pixelWidth,
        pixelHeight
      );
    });
    ctx.stroke();
  };

  $: data, render();
</script>

<canvas
  bind:this={canvas}
  width={$params.width}
  height={$params.height}
  style="width: {$params.width}px; height: {$params.height}px;"
/>

<style>
  canvas {
    border: 1px solid black;
  }
</style>
