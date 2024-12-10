<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import { fetchData } from "../../utils/services/fetchData";
  import type { ITodo } from "../../types/todo";
  import { error } from "@sveltejs/kit";
  import Todo from "../../components/Todo.svelte";
  import Form from "../../components/Form.svelte";

	const query = createQuery({
		queryKey: ["todos"],
		queryFn: async () => await fetchData<ITodo[]>({ url: "https://jsonplaceholder.typicode.com/todos?_limit=5" })
	})

</script>

<main>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/todos">Todos</a></li>
			<li><a href="/users">Users</a></li>
		</ul>
	</nav>

	<h1>Todos</h1>
	<Form/>
	<div>
		{#if $query.isPending}
			<p>Loading...</p>
		{/if}
		{#if $query.error}
			<p>Error: {$query.error.message}</p>
		{/if}
		{#if $query.isSuccess}
			<ul>
				{#each $query.data as todo (todo.id)}
					<Todo {...todo}/>
				{/each}
			</ul>
		{/if}
	</div>
</main>