import axios from "axios";
import type { ITodo } from "../../types/todo";

export enum Method {
	get="GET",
	post="POST",
	patch="PATCH",
	delete="DELETE"
}

interface IOptions {
	url: string,
	method?: Method,
	data?: ITodo,
}

export async function fetchData<T>(options: IOptions): Promise<T> {
	const { data } = await axios(options);
	return data
}