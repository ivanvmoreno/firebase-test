const admin = require("firebase-admin");
const serviceAccount = require(process.env.PATH_TO_SERVICEACCOUNTKEY);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const languagesCollection = 'languages';

async function getAllLanguages(_req, res) {
    try {
        const languages = await db.collection(languagesCollection).get();
        const data = languages.docs.map(doc => doc.data());
        return res.json({
           success: true,
           data,
        });
    } catch(error) {
        res.send('Internal server error', 500);
    }
}

async function getLanguage({ params: { language } }, res) {
    try {
        const languageRef = await db.collection(languagesCollection).where('name', '==', language).get();
        const data = languageRef.docs[0].data();
        return res.json({
            success: true,
            data,
        });
    } catch(error) {
        res.send('Language not found', 400);
    }
}

async function addLanguage({ body: { name } }, res) {
    try {
        const docRef = await db.collection(languagesCollection).add({ name });
        const document = await docRef.get();
        res.send(document.data());
    } catch(error) {
        res.send('Internal server error', 500);
    }
}

async function deleteLanguage({ params: { language } }, res) {
    try {
        const languageRef = await db.collection(languagesCollection).where('name', '==', language).get();
        languageRef.docs.forEach(({ ref }) => ref.delete());
        res.send(200);
    } catch(error) {
        res.send('Language not found', 400);
    }
}

module.exports = {
    getAllLanguages,
    getLanguage,
    addLanguage,
    deleteLanguage
};
