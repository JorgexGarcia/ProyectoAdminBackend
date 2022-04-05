const Usuario = require('../models/usuario');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    //Paginación
    const desde = Number(req.query.desde) || 0;

    //Ejecutar varias promesas de forma simultania y luego se espera a realizar todas 
    const [usuarios, total ] = await Promise.all ([
        Usuario.find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),
        
        Usuario.countDocuments()
    ]);
    
    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg:'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario (req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar
        await usuario.save();

        //Generar token 
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Error inesperado .... '
        });
    }
}

const actualizarUsuario = async (req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB  = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg:'El usuario no se encontro'
            })
        }

        const {password, google, email,...campos} = req.body;

        if(usuarioDB.email != email){
            const existeEmail = await Usuario.findOne( {email: email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg:'El correo ya esta registrado'
                });
            }
        }

        if(!usuarioDB.google){
            campos.email = email;
        }else if(usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg:'Usuarios de google no pueden cambiar su correo'
            });
        }


        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Error inesperado ... '
        });
    }
    
}

const borrarUsuario = async (req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB  = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg:'El usuario no se encontro'
            })
        }
        
        await Usuario.findByIdAndDelete(uid);
    
        res.json({
            ok: true,
            msg: 'El usuario se borro'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Error inesperado ... '
        });
    }
    
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}


