export async function load({ params }) {
	const post = await import(`../../../learn-content/${params.slug}.svx`);
	const title = post.metadata.title;
	const description = post.metadata.description;
	const slug = post.metadata.slug;
	const order = post.metadata.order;
	const content = post.default;

	return {
		title,
		description,
		order,
		slug,
		content
	};
}
