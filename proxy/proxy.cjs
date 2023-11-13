const express = require('express');
const fetch = require("node-fetch");
const app = express();

const baseUrl = 'https://api.football-data.org/v4';
const apiKey = '9c5d28d5c644455a94efe4e3c2e4befc'

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');

	next();
});

// Get All Competitions
app.get('/competitions/', async (_req, res) => {
	const url = `${baseUrl}/competitions/`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Competition by alias e.g: 'PL' for Premier League details
app.get(`/competitions/:alias`, async (_req, res) => {
	const alias = _req.params.alias;

	const url = `${baseUrl}/competitions/${alias}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Competition standings by alias e.g: 'PL' for Premier League standing
app.get(`/competitions/:alias/standings`, async (_req, res) => {
	const alias = _req.params.alias;

	const url = `${baseUrl}/competitions/${alias}/standings`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Competition matches by alias e.g: 'PL' for Premier League matches
app.get(`/competitions/:alias/matches`, async (_req, res) => {
	const alias = _req.params.alias;

	const url = `${baseUrl}/competitions/${alias}/matches`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Competition teams by alias e.g: 'PL' for Premier League teams
app.get(`/competitions/:alias/teams`, async (_req, res) => {
	const alias = _req.params.alias;

	const url = `${baseUrl}/competitions/${alias}/teams`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Competition top goal scorers by alias e.g: 'PL' for Premier League top goal scorers
app.get(`/competitions/:alias/scorers/:limit`, async (_req, res) => {
	const alias = _req.params.alias;
	const limit = _req.params.limit;

	const url = `${baseUrl}/competitions/${alias}/scorers/?limit=${limit}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get all Teams
app.get(`/teams/all/:limit/`, async (_req, res) => {
	const limit = _req.params.limit;

	const url = `${baseUrl}/teams?limit=${limit}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Team detailed information by id 
app.get(`/teams/:id/`, async (_req, res) => {
	const id = _req.params.id;

	const url = `${baseUrl}/teams/${id}/`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Team matches by id 
app.get(`/teams/:id/matches`, async (_req, res) => {
	const id = _req.params.id;

	const url = `${baseUrl}/teams/${id}/matches`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Person detailed information by id 
app.get(`/people/:id/`, async (_req, res) => {
	const id = _req.params.id;

	const url = `${baseUrl}/persons/${id}/`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get Person matches by id 
app.get(`/people/:id/matches`, async (_req, res) => {
	const id = _req.params.id;

	const url = `${baseUrl}/persons/${id}/matches`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get match by id 
app.get(`/matches/:id/`, async (_req, res) => {
	const id = _req.params.id;

	const url = `${baseUrl}/matches/${id}/`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get match head to head by id 
app.get(`/matches/:id/headtohead`, async (_req, res) => {
	const id = _req.params.id;

	const url = `${baseUrl}/matches/${id}/head2head`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

// Get all matches by date
app.get(`/matches/:dateFrom/:dateTo`, async (_req, res) => {
	const dateFrom = _req.params.dateFrom
	const dateTo = _req.params.dateTo

	const url = `${baseUrl}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'X-Auth-Token': apiKey },
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		const result = await response.json();

		return res.json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred' });
	}
});

const port = 3456;

app.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`),
);