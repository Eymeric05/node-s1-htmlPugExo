import express from "express";
import path from "node:path";
import fs from "node:fs";

const app = express();
const port = 3000;
const cwd = process.cwd();
const viewPath = path.join(cwd, "view");

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

// Configuration du moteur de template Pug
app.set('view engine', 'pug');
app.set('views', viewPath);

const menuItems = [
	{ path: '/', title: 'Home', isActive: false },
	{ path: '/about-me', title: 'About', isActive: false },
	{ path: '/references', title: 'References', isActive: false },
	{ path: '/contact-me', title: 'Contact', isActive: false },
];

// Route pour la page d'accueil
app.get('/', (req, res) => {
	const updatedMenuItems = menuItems.map(item => ({
		...item,
		isActive: item.path === '/'
	}));
	res.render('home', { menuItems: updatedMenuItems });
});

// Route pour la page about
app.get('/about-me', (req, res) => {
	const updatedMenuItems = menuItems.map(item => ({
		...item,
		isActive: item.path === '/about-me'
	}));
	res.render('about', { menuItems: updatedMenuItems });
});

// Route pour la page references
app.get('/references', (req, res) => {
	const updatedMenuItems = menuItems.map(item => ({
		...item,
		isActive: item.path === '/references'
	}));
	res.render('references', { menuItems: updatedMenuItems });
});

// Route pour la page contact
app.get('/contact-me', (req, res) => {
	const updatedMenuItems = menuItems.map(item => ({
		...item,
		isActive: item.path === '/contact-me'
	}));
	res.render('contact', { menuItems: updatedMenuItems });
});

// Route POST pour traiter le formulaire de contact
app.post('/contact-me', (req, res) => {
	const { email, message } = req.body;
	
	// Créer l'objet de contact
	const contactData = {
		email,
		message,
		timestamp: new Date().toISOString()
	};
	
	// Lire les contacts existants ou créer un nouveau fichier
	let contacts = [];
	const contactsFile = path.join(cwd, 'contacts.json');
	
	try {
		if (fs.existsSync(contactsFile)) {
			const data = fs.readFileSync(contactsFile, 'utf8');
			contacts = JSON.parse(data);
		}
	} catch (error) {
		console.error('Erreur lors de la lecture du fichier contacts:', error);
	}
	
	// Ajouter le nouveau contact
	contacts.push(contactData);
	
	// Sauvegarder dans le fichier
	try {
		fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
		console.log('Contact sauvegardé:', contactData);
	} catch (error) {
		console.error('Erreur lors de la sauvegarde:', error);
		return res.status(500).send('Erreur lors de la sauvegarde');
	}
	
	// Rediriger vers la page d'accueil avec un message de succès
	res.redirect('/?success=1');
});

// Démarrer le serveur
app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`);
});