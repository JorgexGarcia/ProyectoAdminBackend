const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({
            email
        });

        //Verificar email
        if(!usuarioDB) {
            return res.status(400).json({
                        ok: false,
                        msg: 'Error de login'
                    });
        }


        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Error de login'
            });
        }

        //Genera Token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: token
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}