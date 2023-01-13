import { readable } from 'svelte/store';

// For benchmarking
//   const rows = 1000;
//   const cols = 1000;
//   const repeatIters = 100;

// For live preview
// const rows = 400;
// const cols = 400;
// const repeatIters = 100;

export default readable({
    rows: 2000,
    cols: 2000,
    repeatIters: 100,
    height: 800,
    width: 800,
});