
const getMenuFrontend = (role = 'USER_ROLE') => {

    const menu = [
        {
            titulo: 'Principal',
            icon: 'mdi mdi-gauge',
            subMenu: [
                {
                    titulo: 'Main',
                    url: '/'
                },
                {
                    titulo: 'Gráficas',
                    url: '/dashboard/grafica1'
                },
                {
                    titulo: 'Promesas',
                    url: '/dashboard/promesas'
                },
                {
                    titulo: 'ProgressBar',
                    url: '/dashboard/progress'
                },
                {
                    titulo: 'Rxjs',
                    url: '/dashboard/rxjs'
                },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            subMenu: [

                {
                    titulo: 'Hospitales',
                    url: 'hospitales'
                },
                {
                    titulo: 'Médicos',
                    url: 'medicos'
                }
            ]
        }

    ];

    if(role  === 'ADMIN_ROLE'){
        menu[1].subMenu.unshift({
            titulo: 'Usuarios',
            url: 'usuarios'
        },)
    }

    return menu;
}

module.exports = {
    getMenuFrontend
}
