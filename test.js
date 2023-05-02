const fs = require('fs')
//Challenge
class ProductManager{
    constructor(){
        this.products = [];
        this.path = ('desafio.json')
    }
    addProduct(title,description,price,thumbnail,code,stock){
        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        //Validate de Fields
        if(!title || !description || !price || !thumbnail || !code){
            console.log('All fields are required')
        }
        if(typeof title !== 'string'|| typeof description !== 'string' || typeof price !== 'number' || typeof thumbnail !== 'string' || typeof stock !== 'number'){
            console.log('Any of the fields are incorrect')
        }
        if(!stock){
            product.stock = 1
        }

        //Validate if the code already exist
        if(!this.products.some(p => p.code === product.code)){
            this.products.push(product)
            const productToString = JSON.stringify(this.products);
            fs.writeFileSync(this.path,productToString)
            
        }else{
            console.log('Product already exists')
        }        

    }
    getProducts(){
        //Get the all the products
        const data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        return data

    }
    getProductsById(id){
        //Getting the product by Id
        const data = JSON.parse(fs.readFileSync(this.path,'utf-8'));
        const produtctMatch = data.find(product => product.id === id)

        if(produtctMatch){
            return produtctMatch
        }else{
            return'Not found'
        }

    }
    updateProduct(id,title,description,price,thumbnail,code,stock){
        let data = JSON.parse(fs.readFileSync(this.path , 'utf-8'))
        let productIndex = data.findIndex((pro) => pro.id === id)
        const updateProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        data[productIndex] = updateProduct
        fs.writeFileSync(this.path, JSON.stringify(data))

    }
    deleteProduct(id){
        let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        if(id < 0 || typeof id !== 'number'){
            console.log('Product not Found')
        }
        const leftoOverProducts = data.filter((pro) => pro.id !== id)
        fs.writeFileSync(this.path, JSON.stringify(leftoOverProducts))
    }
}

const productM = new ProductManager;

productM.addProduct('Producto Prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);
productM.addProduct('Producto Prueba2','Este es un producto prueba2',300,'Sin imagen','abc1234',35);

// productM.updateProduct(2,'Producto Prueba3','Este es un producto prueba3',400,'Sin imagen','abcdef123',10)
productM.getProducts()
// productM.deleteProduct(1)