<script>
  import { onMount } from "svelte";
  import { Universe } from "$lib/Universe";
  import RenderLife from "$lib/components/RenderLife.svelte";
  import params from "$lib/params";

  let data = [];
  let totalIterations = 0;
  let t0, t1;

  onMount(() => {
    const universe = new Universe($params.rows, $params.cols);

    requestAnimationFrame(function render() {
      t0 = performance.now();
      let iters = 0;
      while (iters < $params.repeatIters) {
        universe.tick();
        iters += 1;
        totalIterations += 1;
      }
      t1 = performance.now();

      data = universe.cells;
      requestAnimationFrame(render);
    });
  });
</script>

<div>
  <h3>
    JS Iterations: {totalIterations}, Time for last {$params.repeatIters} iterations:
    {Math.round(t1 - t0)}ms
  </h3>
  <RenderLife {data} />
</div>
