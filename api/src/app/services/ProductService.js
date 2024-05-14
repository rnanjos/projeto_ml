const productIntegration = require('../integrations/ProductIntegration');

class ProductService {
    async getProducts(query) {
        const response = await productIntegration.getProducts(query);

        const products = response.results;

        if (!products)
            return [];

        const items = products.map(p => {
            return {
                id: p.id,
                title: p.title,
                price: {
                    currency: p.currency_id,
                    amount: p.price,
                    decimals: p.price
                },
                picture: p.thumbnail,
                condition: p.condition,
                free_shipping: p.shipping.free_shipping,
                category: p.category_id
            };
        });

        const categories = response.available_filters.find(c => c.id === 'category')?.values;

        const categoryMaxResults = this.getCategoryMaxResults(categories);

        return {
            author: this.getAuthor(),
            items,
            categories: categoryMaxResults.categories,
            categoryBreadCrumb: categoryMaxResults.categoryBreadCrumb
        };
    }

    async getProductById(id) {
        const responseById = await productIntegration.getProductById(id);

        if (!responseById)
            throw new Error('Produto não encontrado.');

        const responseByIdDescription = await productIntegration.getProductByIdDescription(id);

        const item = {
            id: responseById.id,
            title: responseById.title,
            price: {
                currency: responseById.currency_id,
                amount: responseById.price,
                decimals: responseById.price
            },
            picture: responseById.thumbnail,
            condition: responseById.condition,
            free_shipping: responseById.shipping.free_shipping,
            sold_quantity: responseById.initial_quantity,
            description: responseByIdDescription.plain_text
        };

        return {
            item,
            categoryBreadCrumb: `Detalhes > Categoria > ${responseById.category_id} > ${item.title}`
        };
    }

    getCategoryMaxResults(categories) {
        const categoryMaxResults = categories.reduce((obj1, obj2) => {
            return obj1.results > obj2.results ? obj1 : obj2;
        });
        const category = `Home > Categoria > ${categoryMaxResults.name}`;
        return {
            categoryBreadCrumb: category,
            categories: categories.map(c => c.name)
        };
    }

    getAuthor() {
        return {
            name: process.env.AUTHOR_NAME,
            lastname: process.env.AUTHOR_LASTNAME
        };
    }
}

module.exports = new ProductService();