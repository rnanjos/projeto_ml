const axios = require('axios');

class ProductIntegration {
    constructor() {
        this.baseUrl = process.env.BASE_URL;
    }

    async getProducts(query) {
        const response = await axios.get(`${this.baseUrl}sites/MLA/search?q=:${query}`);
        return response.data;
    }

    async getProductById(id) {
        const response = await axios.get(`${this.baseUrl}items/${id}`);
        return response.data;
    }

    async getProductByIdDescription(id) {
        const response = await axios.get(`${this.baseUrl}items/${id}/description`);
        return response.data;
    }
}

module.exports = new ProductIntegration();