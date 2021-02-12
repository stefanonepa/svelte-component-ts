<svelte:options tag="svelte-component-ts" />

<script lang="ts">
    import Hello from './components/Hello.svelte';
    import { reverse } from './utils/reverse';
    let message: string = 'Hello world!';
    $: revMessage = reverse(message);
</script>

<div class="un-scoped-class">
    {revMessage}
    <Hello />
</div>

<style>
    /* Some styles are needed to be able to inject sub styles currently, probably need to hack more to avoid this requirement 🤷‍♂️*/
    .un-scoped-class {
        background-color: inherit;
    }
</style>
