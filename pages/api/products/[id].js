import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const { method, query: { id } } = req;

    dbConnect();

    if(method === "GET"){
        try{
            const product = await Product.findById(id);
            if(product){
                return res.status(200).json(product);
            }
            return res.status(200).json({
                Status: "Product not found!"
            })
        } catch(err){
            return res.status(200).json({
                Status: "Erro interno, " + err
            })
        }
    }
    if(method === "PUT"){}
    if(method === "DELETE"){}
  }
  