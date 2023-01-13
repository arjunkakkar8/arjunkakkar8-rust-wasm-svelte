<script>
  import { onMount } from "svelte";
  import init, { Universe } from "$lib/wasm/rust";
  import RenderLife from "$lib/components/RenderLife.svelte";
  import params from "$lib/params";

  let data = [];
  let totalIterations = 0;
  let t0, t1;

  onMount(async () => {
    let wasm = await init();

    const universe = Universe.new($params.rows, $params.cols);

    requestAnimationFrame(function render() {
      t0 = performance.now();
      let iters = 0;
      while (iters < $params.repeatIters) {
        universe.tick();
        iters += 1;
        totalIterations += 1;
      }
      t1 = performance.now();

      data = new Uint8Array(
        wasm.memory.buffer,
        universe.cells(),
        $params.rows * $params.cols
      );
      requestAnimationFrame(render);
    });
  });
</script>

<div>
  <h3>
    WASM Iterations: {totalIterations}, Time for last {$params.repeatIters} iterations:
    {Math.round(t1 - t0)}ms
  </h3>
  <RenderLife {data} />
</div>
