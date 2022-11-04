const userControllers = require("./users.controllers");

const getAllUsers = (re, res) => {
    userControllers
        .getAllUsers()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getUserById = (req, res) => {
    const id = req.params.id;
    userControllers
        .getUserById(id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        });
}

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday, gender, country } = req.body;

    if (
        firstName &&
        lastName &&
        email &&
        password &&
        phone &&
        birthday
    ) {
        //? Ejecutamos el controller
        userControllers.createUser({
            firstName, lastName, email, password, phone, birthday, gender, country
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        //? Error cuando no mandan todos los datos necesarios para crear un usuario
        res.status(400).json({
            message: 'All fields must be completed', fields: {
                firstName: 'string',
                lastName: 'string',
                email: 'example@example.com',
                password: 'string',
                phone: '+51 321456789',
                birthday: 'YYYY/MM/DD'
            }
        })
    }
}

const patchUser = (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, phone, gender, country } = req.body;

    userControllers.updateUser(id, { firstName, lastName, phone, gender, country })
        .then((data) => {
            if (data[0]) {
                res
                    .status(200)
                    .json({ message: `User with ID: ${id}, edited succesfully` });
            } else {
                res.status(404).json({ message: "Invalid ID" })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    userControllers
        .deleteUser(id)
        .then((data) => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: `Invalid ID` })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
};


//? My user services

const getMyUser = (req, res) => {
    const id = req.user.id;  //? req.user contiene la info del token desencriptada

    userControllers.getUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

// TODO rutas protegidas /me, con los verbos para update y delete

const patchMyUser = (req, res) => {
    const id = req.user.id;
    const { firstName, lastName, phone, birthday, gender, country } = req.body;

    userControllers.updateUser(id, { firstName, lastName, phone, birthday, gender, country })
        .then(data => {
            res.status(200).json({ message: `Your user was edited succesfully!` })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })

}


//? 2 tipos de delete:
//* 1. por administrador
//* 2. por mi mismo

const deleteMyUser = (req, res) => {
    const id= req.user.id;

    userControllers.updateUser(id, {status: 'inactive'})
        .then(()=>{
            res.status(200).json({message: `Your user was deleted succesfully!`})
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}



module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser
}
