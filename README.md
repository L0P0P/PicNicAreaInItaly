# Progetto di Piattaforme Digitali per la Gestione del Territorio
## Emanuele Grasso
## Matricola: 307771
## Introduzione

Il progetto **PicNic Area in Italy** rappresenta una Restful API con l'obiettivo di fornire informazioni e posizione su aree PicNic in Italia.
L'idea parte da un Open Data distruibuito dal sito **datiopen.it** e fornito dal sito **OpenStreetMap.org**.

Link Open Data: <link> http://www.datiopen.it/it/opendata/Mappa_delle_aree_picnic_in_Italia

Link Web Site: <link> https://picnicareainitaly.glitch.me

Link Glitch Code: <link> https://glitch.com/edit/#!/picnicareainitaly

## Descrizione

L'Italia è ricca di aree PicNic poco conosciute specialmente per chi non dovesse viverci vicino.
La piattaforma si configura in modo tale da far scoprire le principali aree PicNic presenti in ogni regione italiana.
Per far ciò sfruttiamo i dati forniti da datiopen.it costruendo delle API e un sito web che le sfrutta in modo tale da:

- Visualizzare una mappa con le posizioni già presenti fornendo una lista completa di informazioni dei luoghi;
- Aggiungere un'area alla lista delle aree già presenti;
- Rimuovere un'area dalla lista delle aree già presenti;
- Cercare un'area specifica nella lista delle aree già presenti;
- Modificare il nome di un'area già presente.

## Progetto
- **public/css/**: directory contenente i file .css;
- **public/data.json**: file contenente tutti i dati relativi alle aree PicNic;
- **views/**: directory contentente i file .html;
- **server.js**: server che risponde alle HTTP Requests;

## Dipendenze
- **Express.js**: framework open-source Node.js per la programmazione di applicazioni web e mobile, consente di creare potenti API di routing e di impostare middleware per rispondere alle richieste HTTP;
- **fs**: modulo nativo che consete di eseguire diversi tipi di operazioni su file e directory;
- **ejs**: Embedded Javascrypt Templating è un linguaggio di creazione di modelli che consente di generare markup HTML con Javascrypt;

## Struttura del file data.json
| ccomune | cprovincia | cregione | cnome | canno_inserimento | cdata_e_ora_inserimento | cidentificatore_in_openstreetmap | clongitudine |   clatitudine    |
| ------- | ---------- | -------- | ----- | ----------------- | ----------------------- | ---------------------------------| ------------ | ---------------- |
| Ispica  |   RAGUSA   | Sicilia  |       |        2015       |  2015-09-16T18:09:29Z   |             3746085862           |  14.9177931  | 36.7880838999999 |

## HTML e CSS
Per il progetto sono state realizzate 8 diverse pagine .html con relativi file css
- error.html -> utilizzata per visualizzare una schermata di errore generico in caso di svolgimento delle operazioni;
- index.html -> homepage dell'applicazione consente l'accesso ad una lista di operazioni che è possibile effettuare;
- insert.html -> pagina contenente il form per l'inserimento di un nuovo elemento;
- map.html -> pagina utilizzata per poter visualizzare posizione e informazioni relative a tutti gli elementi presenti nella lista delle aree;
- modify.html -> pagina contenente il form per la modifica di un elemento;
- remove.html -> pagina contenente il form per la rimozione di un elemento;
- search.html -> pagina contenente il form per la ricerca di un elemento;
- success.html -> utilizzata per visualizzare una schermata di successo durante lo svolgimento delle operazioni;

## Endpoint di Operazioni CRUD

### GET per richiamare la view

- app.get('/');
- app.get('/map');
- app.get('/insert');
- app.get('/remove');
- app.get('/search');
- app.get('/modify');

### GET per il corretto funzionamento delle API

- app.get('/rawdata');
- app.get('/success');
- app.get('/error');

### POST per aggiungere una location alla lista, inserendo i dati opportuni (il Nome non è obbligatorio)
app.post('/insertion');

<sup>La validazione dell'inserimento avviene sulla posizione del luogo, se esso è già presente nell'elenco l'operazione di POST fallirà</sup>

### DELETE per rimuovere un'area la cui posizione corrisponde a quella passata come body
app.delete('/removing');

### GET per cercare un'area la cui posizione corrisponde a quella passata attraverso i parametri
app.get('/research);

### PUT per modificare la location la cui posizione corrisponde a quella passata come body
app.put('/modification');
