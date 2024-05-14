const productService = require('../services/ProductService');

class ProductController {
    async index(request, response) {
        try {
            const query = request.query;
            
            if(!query.q) {
                throw new Error('Informe os dados do produto que deseja buscar.');
            }
            
            const result = await productService.getProducts(query.q);
            return response.send(result);
        } catch (error) {
            return response.status(400).send({
                error: error.message,
                message: 'Aconteceu um erro ao buscar produtos.'
            });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;
            
            const result = await productService.getProductById(id);
            return response.send(result);
        } catch (error) {
            return response.status(400).send({
                error: error.message,
                message: 'Aconteceu um erro ao buscar produtos.'
            });
        }
    }
}

module.exports = new ProductController();