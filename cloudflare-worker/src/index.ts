import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
	OPEN_AI_API_KEY: string;
	AI: Ai;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	'/*',
	cors({
		origin: '*', // Allow requests from any origin
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'], // Add Content-Type to the allowed headers to fix CORS
		allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/translateDocumnet', async (c) => {
	const { document, targetLanguage } = await c.req.json();

	try {
		// generate summery of document 
		const summaryResponse = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
			input_text: document,
			max_length: 1000
		})

		// translate summary to target language
		const response = await c.env.AI.run("@cf/meta/m2m100-1.2b", {
			text: summaryResponse.summary,
			source_lang: "english",
			target_lang: targetLanguage,
		})


		return new Response(JSON.stringify(response), { status: 200 })
	}

	catch (err) {
		console.log(err);
		return new Response(JSON.stringify({}), { status: 500 })
	}

})

app.post('/chatToDocument', async (c) => {
	const { document, question } = await c.req.json();

	const messages = [
		{ role: "system", content: "You are a assistant helping the user to chat to a document. I am providing a JSON file of the markdown for the document. Using this, answer the users question in the clearest way possible, the document is about just reply about answer" },
		{
			role: "user",
			content: `The document is ${document} and My Question is: ${question}`,
		},
	];

	const response = await c.env.AI.run("@cf/meta/llama-3.1-70b-instruct", { messages });

	return new Response(JSON.stringify(response), { status: 200 })
})

app.get('/', async (c) => {
	return new Response('Hello World!')
})

export default app;
