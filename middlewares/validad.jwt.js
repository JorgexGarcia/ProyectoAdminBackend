
const jwt = require('jsonwebtoken');
const {response} = require('express');
const Usuario = require('../models/usuario');


const validarJWT = (req, res = response , next) => {

    //Leer el header
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

const validarRole = async (req, res, next) => {

    const id = req.uid;

    try{

        const usuarioDB = await Usuario.findById(id);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no válido'
            });
        }

        next();

    }catch (error){
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const validarMismoUsuario = async (req, res, next) => {

    const id = req.uid;
    const _id = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(id);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role === 'ADMIN_ROLE' ||
            id === _id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no válido'
            });
        }

    }catch (error){
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

module.exports= {
    validarJWT,
    validarRole,
    validarMismoUsuario
}
