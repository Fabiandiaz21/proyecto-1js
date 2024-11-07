import mongoose from "mongoose";
import Categorias from "../models/categorias.js";

const httpcategorias = {
    //Crear
    postcategorias:async(req,res)=>{
        try{
            const {
                descripcion,estado
            } = req.body
            const categoria = new Categorias({
                descripcion,estado
            });
            await categoria.save();
        }catch(error){
            res.status(404).json({error:"Falla en la operacion"})
            console.log(error);
        }
    },

    //Modificar
    putcategorias:async(res,req)=>{
        try{
            const {id} = req.params;
             //validar que el id sea un objeto valido
             if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:"ID no es valido"});
            }
            const {description,estado} = req.body
            const categoria = await Categorias.finByAndUdate(id,{description,estado},{new:true});
            if(!categoria){
                return res.status(404).json({error:"Categoria no encontrada"})
            }
            res.json(categoria);
        }catch{
            res.status(404).json({error:"Falla en la operacion"})
            console.log(error);
        }
    },
     //Listar todos
     getcategorias: async (req,res) => {
        try{
            const categoria = await Categorias.find();
            req.json(categoria);
        }catch(error){
            res.status(500).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },
     //Listar por ID
     getcategoriasById: async (req,res) => {
        try{
            const {id} = req.params;
            //Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }
            const categoria = await Categorias.findById(id);
            if (!categoria) {
                return res.status(404).json({ error: "Categoria no encontrada" });
            }
            res.json({ categoria });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
        },
    //Activar
    putActivarCategorias: async (req, res) => {
        try {
            const { id } = req.params;
            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }
            const categoria = await Categorias.findByIdAndUpdate(id, { state: "aprobado" }, { new: true });
            if (!categoria) {
                return res.status(404).json({ error: "categoria no encontrada" });
            }
            res.json({ categoria });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    //Desactivar
    putInactivarCategorias: async (req, res) => {
        try {
            const { id } = req.params;
            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }
            const categoria = await Categorias.findByIdAndUpdate(id, { state: "anulado" }, { new: true });
            if (!categorias) {
                return res.status(404).json({ error: "categoria no encontrada" });
            }
            res.json({ categoria });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },
    //Lista por activos
    getActivos: async (req, res) => {
        try {
            const categoria = await Categorias.find({ estado: "aprobado" });
            
            if (!categoria.length) {
                return res.status(404).json({ error: "No se encontraron categorias aprobadas" });
            }
            req.json({ categoria });
        } catch (error){
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
     //Lista por inactivos
     getAnulados: async (req, res) => {
        try {
            const categoria = await Categorias.find({ estado: "anulado" });
            
            if (!categoria.length) {
                return res.status(404).json({ error: "No se encontraron categorias anuladas" });
            }
            req.json({ categoria });
        } catch (error){
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
}
export default  httpcategorias


