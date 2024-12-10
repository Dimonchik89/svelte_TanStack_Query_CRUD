<script lang="ts">
	import type { ITodo } from "../types/todo";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { fetchData, Method } from "../utils/services/fetchData";

	const queryClient = useQueryClient();

	const update = createMutation({
		mutationKey: ['todos'],
		mutationFn: async (data: ITodo) => await fetchData<ITodo>({
			url: `https://jsonplaceholder.typicode.com/todos/${id}`,
			method: Method.patch,
			data
		}),
		onSuccess: (data) => {
			queryClient.setQueryData(['todos'], (oldData) => {
				return oldData.map(item => {
					if(String(item.id) !== String(data.id)) {
						return item
					} else {
						return data;
					}
				})
			})
		}
	})

	const handleDelete = createMutation({
		mutationKey: ['todos'],
		mutationFn: () => fetchData<void>({
			url: `https://jsonplaceholder.typicode.com/todos/${id}`,
			method: Method.delete
		}),
		onSuccess: () => {
			queryClient.setQueryData(['todos'], (oldData) => {
				return oldData.filter(item => String(item.id) !== String(id))
			})
		}
	})



	let { id, title, completed }: ITodo = $props();
</script>

<li class="todo">
	<input
		type="checkbox"
		checked={completed}
		onclick={(event) => {
			event.preventDefault();
			$update.mutate({ completed: !completed })
		}}
		disabled={$update.isPending}
	/>
	<p>{title}</p>
	<button
		onclick={() => $handleDelete.mutate()}
		disabled={$handleDelete.isPending}
	>
		X
	</button>
</li>

<style>
	.todo {
		display: flex;
		width: 450px;
		height: 25px;
		align-items: center;
	}

	p {
		flex: 1 0 auto
	}
</style>