import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const { method } = req;

    dbConnect();

    if(method === "GET"){
        try{
            const products = await Product.find();
            if(products.length > 0){
                return res.status(200).json(products);
            }
            return res.status(200).json({
                Status: "No products found!"
            })
        } catch(err){
            return res.status(200).json({
                Status: "Erro interno, " + err
            })
        }
    }
    if(method === "POST"){
        try{
            const product = await Product.create(req.body);
            return res.status(200).json(product);
        } catch(err){
            return res.status(200).json({
                Status: "Erro interno, " + err
            })
        }
    }
    if(method === "PUT"){}
    if(method === "DELETE"){}
  }
  