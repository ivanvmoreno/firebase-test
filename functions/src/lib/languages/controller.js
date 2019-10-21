const languages = require('./languages.json');

function getAllLanguages(_req, res) {
    return res.json({
       success: true,
       data: languages,
    });
}

function getLanguage({ params: { language } }, res) {
    const lang = languages.filter(lang => lang.name === language);
    const exists = lang.length > 0;

    return res
        .status(exists ? 200 : 404)
        .json({
            success: exists,
            data: exists
                ? lang[0]
                : 'Language not found',
        });
}

module.exports = {
    getAllLanguages,
    getLanguage,
};
