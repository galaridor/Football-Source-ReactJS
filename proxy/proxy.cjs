const express = require('express');
const fetch = require("node-fetch");
const app = express();

const apiKey = '9c5d28d5c644455a94efe4e3c2e4befc'

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');

	next();
});

// Get All Competitions
app.get('/competitions/', async (_req, res) => {
	const url = 'https://api.football-data.org/v4/competitions/';

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

	const url = `https://api.football-data.org/v4/competitions/${alias}`;

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

	const url = `https://api.football-data.org/v4/competitions/${alias}/standings`;

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

	const url = `https://api.football-data.org/v4/competitions/${alias}/matches`;

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

	const url = `https://api.football-data.org/v4/competitions/${alias}/teams`;

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
app.get(`/competitions/:alias/scorers`, async (_req, res) => {
	const alias = _req.params.alias;

	const url = `https://api.football-data.org/v4/competitions/${alias}/scorers`;

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