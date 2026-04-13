// ================================================
// GALERÍA - DATOS CHICA 21
// ================================================

const galeriaData_21 = {
    '21_2': {
        titulo: "PRUEBA",
        descripcion: "xdxdxdxdxd",
        categoria: "Prueba",
        imagen: "https://pbs.twimg.com/media/HCrY9OhWMAAGqaz?format=jpg&name=small",
        imagenes: [
            { id: 1, url: "https://pbs.twimg.com/media/HCrY9OhWMAAGqaz?format=jpg&name=small" },
            { id: 2, url: "https://pbs.twimg.com/media/HCq3vdHXYAEffD7?format=png&name=small" }
        ]
    }
};

// Registrar en galeriaDatabase global
if (typeof galeriaDatabase !== 'undefined') {
    Object.assign(galeriaDatabase, galeriaData_21);
}
