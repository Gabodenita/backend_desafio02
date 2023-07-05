const fs = require('fs/promises');
const path = require('path');
const filename ='product.json'

class ProductManager{
    constructor(path){
        this.product=[]
        this.filepath = path//.join(__dirname, filename)
    }
    
    async addProduct({title, description, price, thumbnail, code, stock}){
           
        const data = await fs.readFile(this.filepath, 'utf-8');
        const product = JSON.parse(data);
        
        if(title && description && price && thumbnail && code && stock){
            const newId = product[product.length - 1]?.id || 0
            const producto = product.find(e => e.code === code)
            if (producto){
                return console.log("el codigo es invalido")
            }else if (!producto){
                product.push({
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    id: newId + 1,
                })
                console.log(product)
                console.log ("el producto se agregó exitosamente")
                
            }
        }else{
            return console.log("Debe ingresar todoso los campos del producto")
        }
        await fs.writeFile(this.filepath, JSON.stringify(product, null, 2))
    } 
      
    async getProduct() {
        const data= await fs.readFile(this.filepath, 'utf-8')
        const product = JSON.parse(data)
        return product
    }

    async getProduct_length() { 
        const data= await fs.readFile(this.filepath, 'utf-8')
        const product = JSON.parse(data)
        return product.length
    }
    async getProductById(productId) {
        const data= await fs.readFile(this.filepath, 'utf-8')
        const product = JSON.parse(data)
        const producto = product.find(e => e.id === productId)
        if (!producto){
            return console.log("el id es invalido")
        }
        if (producto){
            console.log(producto)
        }
    }
    async updateProduct(idBuscado, codeNuevo){
        const data= await fs.readFile(this.filepath, 'utf-8')
        const product = JSON.parse(data)
        let encontrado = product.find(e => e.id ===idBuscado)
        if (!encontrado){
            return console.log("el id es invalido")
        }
        if (encontrado){
            encontrado.code = codeNuevo
            console.log(encontrado)
        }
        await fs.writeFile(this.filepath, JSON.stringify(product, null, 2))
    }
    
    async deletedProduct(idBuscado) {
        const data= await fs.readFile(this.filepath, 'utf-8')
        const product = JSON.parse(data)
        const productoFiltrado= product.filter(e=>e.id!==idBuscado)
            console.log(productoFiltrado)
        
        await fs.writeFile(this.filepath, JSON.stringify(productoFiltrado, null, 2))
    }


}

const productoNuevo =new ProductManager(path.join(__dirname, filename))

async function main(){
    
    await productoNuevo.addProduct({ 
        title: "5555aa",
        description: "cuatro puertas",
        price: "100",
        thumbnail: "dasfasdadsa",
        code: "ABC4",
        stock: 20
    })
    
}

//main()

// productoNuevo.addProduct({
//     title: "aaaaaa",
//     description: "cuatro puertas",
//     price: "100",
//     thumbnail: "dasfasdadsa",
//     code: "ABC7",
//     stock: 20
// })
// console.log(productoNuevo.getProduct)

//productoNuevo.updateProduct(2, "ERT5")
productoNuevo.deletedProduct(2)