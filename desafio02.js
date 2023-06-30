const fs = require('fs/promises');
const path = require('path');



class ProductManager{
    constructor(){
        this.product=[]
        this.filepath = path
    }
    
    async addProduct({title, description, price, thumbnail, code, stock}){   
        const data = await fs.readFile(this.filepath, 'utf-8');
        const product = JSON.parse(data);

        if(title && description && price && thumbnail && code && stock){
            const newId = product[product.length - 1]?.id || 0
            const producto = this.product.find(e => e.code === code)
            if (producto){
                return console.log("el codigo es invalido")
            }else if (!producto){
                this.product.push({
                    ...producto,
                    id: newId + 1
                })
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
    
}

const productoNuevo =new ProductManager(path.join(__dirname, 'product.JSON'))

async function main(){
    console.log(await productoNuevo.getProduct())

    await productoNuevo.addProduct({ 
        title: 'aaaaaa',
        description: "cuatro puertas",
        price: "100",
        thumbnail: "dasfasdadsa",
        code: "ABC1",
        stock: 20
    })
    console.log(await productoNuevo.getProduct)

}

main()

//  productoNuevo.addProduct({title: 'aaaaaa', description: "cuatro puertas", price: "100", thumbnail: "dasfasdadsa", code: "ABC1", stock: 20})
//  productoNuevo.addProduct({ title: 'asdfasd', description: "aadsfasdasszxcvz", price: "10", thumbnail: "asdfasd", code: "ABC2" , stock: 55})
//  productoNuevo.addProduct({ title: 'auto', description: "3 puertas", price: "500", thumbnail: "dasfasdadsa", code: "ABC6", stock: 5})
//  productoNuevo.addProduct({ title: 'moto', description: "0 puertas", price: "500", thumbnail: "dasfasdadsa", code: "ABC3", stock: 5})
//  productoNuevo.addProduct({ title: 'camioneta', description: "3 puertas", price: "500", thumbnail: "dasfasdadsa", code: "ABC4", stock: 5})


// console.log(p.getProduct())
// // console.log(p.getProductById(3))
