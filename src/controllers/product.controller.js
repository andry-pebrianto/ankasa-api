const productModel = require('../models/product.model')
const { success, failed } = require('../utils/createResponse')
const { v4: uuidv4 } = require('uuid')


const productController = {
    getListProduct: async (req, res) => {
        try {
            const { transitFiltered, airlinesFiltered, minPriceFiltered, maxPriceFiltered } = req.query

            const transit = transitFiltered || '';
            const airline = airlinesFiltered || '';
            const minprice = minPriceFiltered || '';
            const maxprice = maxPriceFiltered || '';

            await productModel.getAllProduct(transit, airline, minprice, maxprice)
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result.rows,
                        message: 'get All product success'
                    })
                })
                .catch((err) => {
                    failed(res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to get All product'
                    })
                })
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error'
            })
        }
    },
    createdProduct: async (req, res) => {
        try {
            const id = uuidv4()

            // Jika sudah ada login maka airline_id diambil dari id admin yang sedang login

            // const airline_id = 

            const { origin, destination, price, seat_class, stock,
                transit_total, flight_date, airline_id, estimation,
                created_date, code, gate, terminal } = req.body

            await productModel.storeProduct(origin, destination, price, seat_class, stock,
                transit_total, flight_date, airline_id, estimation,
                created_date, code, gate, terminal, id)
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: null,
                        message: 'create product success'
                    })
                    res.json(res, 'berhasil create')
                })
                .catch((err) => {
                    failed((res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to create product'
                    }))
                    res.json(res, 'gagal create')
                })

        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error'
            })
            res.json(err, 'internal server')
        }
    },
    getDetailProduct: async (req, res) => {
        try {
            const id = req.params.id

            await productModel.detailProduct(id)
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result.rows[0],
                        message: 'get detail product success'
                    })
                })
                .catch((err) => {
                    failed(res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to get detail product'
                    })
                })
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error'
            })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id

            const { origin, destination, price, seat_class, stock,
                transit_total, flight_date, airline_id, estimation,
                created_date, code, gate, terminal } = req.body

            await productModel.updateProduct(origin, destination, price, seat_class, stock,
                transit_total, flight_date, airline_id, estimation,
                created_date, code, gate, terminal, productId)
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result,
                        message: 'update product success'
                    })
                })
                .catch((err) => {
                    failed((res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to update product'
                    }))
                })

        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error'
            })
            res.json(err, 'internal server')
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id

            productModel.deleteProduct(id)
                .then((result) => {
                    success(res, {
                        code: 200,
                        payload: result.rows,
                        message: 'delete product success'
                    })
                })
                .catch((err) => {
                    failed(res, {
                        code: 500,
                        payload: err.message,
                        message: 'failed to delete product'
                    })
                })
        } catch (err) {
            failed(res, {
                code: 500,
                payload: err.message,
                message: 'Internal server error'
            })
        }
    },

}

module.exports = productController;