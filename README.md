# Environnement local pour MongoDB avec Docker Compose

Projet fournissant un fichier "docker compose" et une structure de répertoire de base pour avoir une base de données [MongoDB](https://www.mongodb.com/docs/manual/) dans un environnement local.

Deux applications sont lancées par le fichier Docker Compose :

- Une instance MongoDB
- [mongo-express](https://github.com/mongo-express/mongo-express) qui est une interface d'administration MongoDB dans le navigateur.

Lors de la création du conteneur MongoDB, le fichier `/mongodb/initdb.d/mongo-init.js` est exécuté pour créer la base de données `got_db`, ajouter l'utilisateur `jon_snow`, ainsi que créer et remplir la collection `got_seasons_collection`.

## Lancer les conteneurs

```bash
docker compose up -d
```

## Accèder à MongoDB depuis le conteneur

Ouvrir un shell dans le conteneur : 

```bash
docker exec -it mongodb bash
```

 Se connecter à l'instance MongoDB avec la CLI en exécutant [mongosh](https://www.mongodb.com/docs/mongodb-shell/) : 

```bash
mongosh -port 27017 -authenticationDatabase "admin" -u "root" -p
```

*Le mot de passe vous sera demandé (il est défini dans le fichier `.env` dans la variable `MONGO_INITDB_ROOT_PASSWORD`).*

Vous pouvez afficher les bases de données avec la commande : 

```bash
show dbs
```

## MongoDB shell depuis l'environnement local

Vous pouvez installer `mongosh` (MongoDB Shell) directement sur votre ordinateur et l'utiliser pour vous connecter à l'instance MongoDB.

Si vous tapez simplement `mongosh` dans un terminal, il tentera par défaut de se connecter à une instance MongoDB sur `127.0.0.1` et sur le port `27017`.

Si votre instance est active, elle s'y connectera. Cependant vous ne pouvez pas faire grand chose car **vous ne serez pas authentifié**.

Pour s'authentifier avec les identifiants administrateurs : 

```bash
mongosh -port 27017 -u "root" -p
```

*Le mot de passe vous sera demandé (il est défini dans le fichier `.env` dans la variable `MONGO_INITDB_ROOT_PASSWORD`).*

## Connection avec mongosh avec une URI 

Pour se connecter à une instance MongoDB avec `mongosh` en utilisant une **URI de connexion**, vous pouvez utiliser la syntaxe suivante :

```bash
mongosh "mongodb://<username>:<password>@<host>:<port>/<database>?authSource=<authDatabase>"
```

Supposons que vous avez un utilisateur `root` avec le mot de passe `password`, et que MongoDB est en cours d'exécution sur le port `27017` de l'hôte `localhost`. Si vous souhaitez vous connecter à la base de données `got_db` et que l'utilisateur est enregistré dans la base de données `admin`, la commande serait :

```bash
mongosh "mongodb://root:password@localhost:27017/got_db?authSource=admin"
```

Pour des raisons de sécurité, il est recommandé de ne pas inclure le mot de passe directement dans l'URI. Vous pouvez laisser le mot de passe vide, et `mongosh` vous invitera à le saisir :

```bash
mongosh "mongodb://root@localhost:27017/got_db?authSource=admin"
```

## Optionnel : se connecter avec l'utilisateur définit dans `mongo-init.js`

Pour se connecter avec l'utilisateur `jon_snow` défini dans `mongo-init.js` (désactivé par défaut, supprimez les commentaires pour l'activer),

```bash
mongosh got_db -u "jon_snow" -p
```

*Vous devez ensuite saisir le mot de passe spécifié pour l'utilisateur `jon_snow` dans le fichier `mongo-init.js`.*

Vous pouvez maintenant tester une requête sur la base de données :

```javascript
db.got_seasons_collection.find({}, { season : 1, year : 1 })
```

Alternativement, vous pouvez vous connecter avec `mongosh` et vous authentifier directement sur la base de données `got_db` en utilisant les commandes suivantes :

```bash
mongosh
```

Une fois connecté au shell MongoDB, basculez sur la base de données `got_db` et authentifiez-vous avec l'utilisateur `jon_snow` :

```bash
use got_db
db.auth("jon_snow", "ygritte")
```

Vous êtes maintenant connecté en tant qu'utilisateur `jon_snow` et pouvez exprimer une requête sur la base de données, par exemple :

```javascript
db.got_seasons_collection.find({}, {season : 1, year : 1})
```

## Pour accèder à MongoDB via mongo-express

Vous y accédez en pointant votre navigateur vers l'url `http:\\localhost:8081`. Il vous sera demandé de saisir un login et un mot de passe : vous tapez la valeur définie pour `MONGO_EXPRESS_USERNAME` et `MONGO_EXPRESS_PASSWORD` dans le fichier `.env`.

## MongoDB for VS Code

Si vous utilisez Visual Studio Code, vous pouvez installer une [extension officielle](https://www.mongodb.com/products/tools/vs-code) qui vous permet d'accéder à une instance MongoDB. [Documentation complète](https://www.mongodb.com/docs/mongodb-vscode/).

## Installation et utilisation de Compass

Si vous préférez un **client graphique de bureau**, vous pouvez installer [Compass](https://www.mongodb.com/products/tools/compass), un outil officiel de **MongoDB**. 

## Pour arreter les conteneurs

Si vous souhaitez arrêter les conteneurs :

```
docker compose down
```

## Sources : 
- https://medium.com/norsys-octogone/a-local-environment-for-mongodb-with-docker-compose-ba52445b93ed
- https://github.com/TGITS/docker-compose-examples
- https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/
- https://www.mongodb.com/docs/mongodb-shell/
- https://github.com/mongo-express/mongo-express