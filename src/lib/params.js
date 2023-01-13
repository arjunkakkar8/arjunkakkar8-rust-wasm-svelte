import { readable } from 'svelte/store';

export default readable({
    rows: 3000,
    cols: 3000,
    repeatIters: 1,
});