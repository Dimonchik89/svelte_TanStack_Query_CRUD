<script lang="ts">
  	import type { ITodo } from "../types/todo";
	import { fetchData, Method } from "../utils/services/fetchData";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";;

	const queryClient = useQueryClient()

	let value = $state<string>('');

	const handleMutation = createMutation({
		mutationKey: ['todos'],
		mutationFn: (data: ITodo) => fetchData<ITodo>({
			url: `https://jsonplaceholder.typicode.com/todos`,
			method: Method.post,
			data
		}),
		onSuccess: (data) => {
			queryClient.setQueryData(['todos'], (oldData) => {
				return [data, ...oldData];
			})
			value = '';
		}
	})

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		$handleMutation.mutate({ title: value, completed: false })
	}
</script>

<form onsubmit={onSubmit}>
	<input type="text" bind:value={value}>
	<button type="submit" disabled={$handleMutation.isPending}>Add</button>
</form>