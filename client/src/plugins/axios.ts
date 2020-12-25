import axios from 'axios';

const config = {
	baseURL: 'http://localhost:3000',
	timeout: 5000,
};

const client = axios.create(config);

export default client;
