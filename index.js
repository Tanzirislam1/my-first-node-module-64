const express = require('express');
/* node express website > resources > middleware > cors > require('cors') and app.use(cors()) */
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

// app.get k amra api o bolte pari ba route er moto think korte pari amra app.get kore res theke amra jei kono kicu pete pari niche amra users k and single user k access kortase...

app.get('/', (req, res) => {
    res.send('Hello thats My Personal server');
});

const users = [
    { id: 1, name: 'shabana', email: 'shabana@gmail.com', phone: '0178888888' },
    { id: 2, name: 'shabnoor', email: 'shabnoor@gmail.com', phone: '0178888888' },
    { id: 3, name: 'shuchorita', email: 'shuchorita@gmail.com', phone: '0178888888' },
    { id: 4, name: 'shuchondra', email: 'shuchondra@gmail.com', phone: '0178888888' },
    { id: 5, name: 'sraboni', email: 'sraboni@gmail.com', phone: '0178888888' },
    { id: 6, name: 'snigdha', email: 'snigdha@gmail.com', phone: '0178888888' },
    { id: 7, name: 'sabila', email: 'sabila@gmail.com', phone: '0178888888' }
]

/* load data in server : ai api er moddhe 1st perameter diye amra route set kore ditase and 2nd perameter er moddhe amra akta callback function nise jer moddhe 2 ta perameter akta hocche req arekta res amra response ta k function er moddhe res.send() kore users jei data array of objects oi data r variable name k set kortase data gulo server e show korar jonne... */
app.get('/users', (req, res) => {
    /* filter by search query perameter : amra address bar er moddhe amra users likhe ? diye terpor amra users?name=sab ba jae likhbo sheita req.query read kortase amra console kortase req.querry k... */
    // console.log('query', req.query);

    /* filter by search query perameter : if jodi req.query er moddhe name jodi thake amra server er address bar e jodi users?name=sab/noor search kori tahole amra ai name er kicu pele amader ui tae show korbe amra singel data k pete find kori aikhane jeheto users er moddhe name k pete chai aikhane onk user name ache tai users er upor filter use kortase jno shob gulo users theke name gulo k filter kore amra user.name.includes(search) user er name k jodi include kora hoy tahole amra res.send(matched) response pabo...er jodi oi name kicu nh pai tahole shob gula users k amra pabo  */
    if (req.query.name) {
        const search = req.query.name.toLocaleLowerCase();
        const matched = users.filter(user => user.name.toLocaleLowerCase().includes(search))
        res.send(matched)
    }
    else {
        res.send(users);
    }

})

/* Access params with dynamic-api : 

Access-params: amra req theke params k console kore dekhar try kortase amra server er address bar e user route er por / diye jae likhi sheita amra object akare paitase amra nodemoon er cmd pannale check korle bujte parbo amra object akare amader likha gulo pacchi.. address bar e ja likhtase sheigulo k params akare read kortase jeheto object tai amra . dot diye (req.params.id) aivabe amra id k access kortase id variable er moddhe kinto ai id hocche string (console pannle) tai amra ai id k parseInt kore number e convert kortase...

dynamic-api : amra api er app.get er 1st perameter e route set kore amra dynamic-id set korse users er single data access korte amra user variable er moddhe users data gulo k find kore find er condition er moddhe amra params theke theke jei id pacchi oi id er amader users fake-data theke jei id pacchi ai 2 ta id jodi same hoy tahole amra single user k paitase...ai user er response access korte amra res.send() er moddhe user k set kortase and single user k access kortase...  */
app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    res.send(user)
})

/* recive post-method from client side: clent side theke user k amra server side e pacchi kina sheita req k console kore dekhar try kortase user k console korte partase nh tai amra req er moddhe body k payoar try kortase console kore kinto undefiend dekhacche (express post body is undefiend) likhe search kore amra stack overflow check korte pari abar amra (express > resources > middleware > body parser) amra cors er moto kore body parse k json() e convert kore use korte pari...kinto amra middleware hisabe app.use(express.json()) amra app.use() er moddhe express.json() k call kortase...chaile middleware theke amra niye ashate pari body parser k install kore amra app.use(bodyParser.json()) bodyParser k json e convert kortase...upore amra add korse */
app.post('/user', (req, res) => {
    console.log('request', req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
})

app.get('/fruits', (req, res) => {
    res.send(['mango', 'apple', 'oranges']);
})

app.get('/fruits/mango/fazle', (req, res) => {
    res.send('sour soud fazle flavor')
})

app.listen(port, () => {
    console.log("Listening to port", port);
})