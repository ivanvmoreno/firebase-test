const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.addLanguage);
router.get('/all', controller.getAllLanguages);
router.get('/:language', controller.getLanguage);
router.delete('/:language', controller.deleteLanguage);

module.exports = router;
