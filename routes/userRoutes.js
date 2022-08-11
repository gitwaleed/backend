const app = require('express');
const router = app.Router();
const {registerValidations, upload } = require('../middlewares/userMiddleware');
const {registerUser, fetchAllUsers, updateUser, deleteUser, getUser, searchUser} = require('../controllers/userController');
router.post('/register', upload.single('testImage'), registerValidations,  registerUser);
router.get('/fetchAllUsers',  fetchAllUsers);
router.put('/updateUser/:id', upload.single('testImage'), registerValidations,  updateUser);
router.delete('/deleteUser/:id', deleteUser );
router.get('/getUser/:id', getUser);
router.get('/searchQuery/:key', searchUser)
module.exports = router;


    



