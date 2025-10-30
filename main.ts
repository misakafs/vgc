import { parse } from '@std/yaml';

// 读取配置
const raw = await Deno.readTextFile('config.yaml');

let config;
try {
	config = parse(raw);
} catch (err) {
	if (err instanceof SyntaxError) {
		console.error('Invalid YAML:', err.message);
	}
	throw err;
}

// 启动服务
Deno.serve(async (req) => {
	const url = new URL(req.url);

	if (url.pathname === '/api/config') {
		const body = JSON.stringify({
			code: 0,
			msg: 'ok',
			data: config,
		});
		return new Response(body, {
			status: 200,
			headers: {
				'content-type': 'application/json; charset=utf-8',
			},
		});
	}

	return new Response('一切正常', {
		status: 200,
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	});
});
