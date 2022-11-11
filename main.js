import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hell" })
})

const likeDislike = 0;



let users = [{
    "id": 1,
    "login": "ivan",
    "pass": "123",
    "fullName": "ivanov ivan ivanovich",
    "balance": 0,
    "role": 1,
    "tempRole": 1,
    "shopId": 0,
    "loan": 0
},
{
    "id": 2,
    "login": "petr",
    "pass": "123",
    "fullName": "petr petr petr",
    "balance": 0,
    "role": 2,
    "tempRole": 2,
    "shopId": 6,
    "loan": 0
},
{
    "id": 3,
    "login": "nik",
    "pass": "123",
    "fullName": "nik nik nik",
    "balance": 0,
    "role": 3,
    "tempRole": 3,
    "shopId": 0,
    "loan": 0
},
{
    "id": 4,
    "login": "andre",
    "pass": "123",
    "fullName": "andre andre andre",
    "balance": 0,
    "role": 4,
    "tempRole": 4,
    "shopId": 0,
    "loan": 0
},
{
    "id": 5,
    "login": "yey",
    "pass": "123",
    "fullName": "yey yey yey",
    "balance": 0,
    "role": 5,
    "tempRole": 5,
    "shopId": 0,
    "loan": 0
},
{
    "id": 6,
    "login": "shop1",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 1,
    "loan": 0,
    "city": "Dmitrov",
    "comments": [],
    "sellers": []
},
{
    "id": 7,
    "login": "shop2",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 2,
    "loan": 0,
    "city": "Kaluga",
    "comments": [],
    "sellers": []
},
{
    "id": 8,
    "login": "shop3",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 3,
    "loan": 0,
    "city": "Moscow",
    "comments": [],
    "sellers": []
},
{
    "id": 9,
    "login": "shop4",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 4,
    "loan": 0,
    "city": "Ryazan",
    "comments": [],
    "sellers": []
},
{
    "id": 10,
    "login": "shop5",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 5,
    "loan": 0,
    "city": "Samara",
    "comments": [],
    "sellers": []
},
{
    "id": 11,
    "login": "shop6",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 6,
    "loan": 0,
    "city": "Saint-Petersburg",
    "comments": [],
    "sellers": []
},
{
    "id": 12,
    "login": "shop7",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 7,
    "loan": 0,
    "city": "Taganrog",
    "comments": [],
    "sellers": []
},
{
    "id": 13,
    "login": "shop8",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 8,
    "loan": 0,
    "city": "Tomsk",
    "comments": [],
    "sellers": []
},
{
    "id": 14,
    "login": "shop9",
    "pass": "123",
    "fullName": "123",
    "balance": 0,
    "role": 6,
    "tempRole": 6,
    "shopId": 9,
    "loan": 0,
    "city": "Habarovsk",
    "comments": [],
    "sellers": []
}
]
let reqRiseList = [];
let reqLoan = [];
let reqDowngrade = [];
let admins = [
    {
        "id": 5,
        "login": "yey"
    }
]

// registration and authorisation
app.post("/reg", (req, res) => {
    const { login, pass, fullName } = req.body;
    const user = users.find(el => el.login === login && el.pass == pass);
    const id = users.length + 1;
    const defBalance = 0;
    const defRole = 1;
    const defTempRole = 1;
    const defShopId = 0;
    const defLoan = 0;
    if (user) {
        return res.status(500).json({ error: "User already register" });
    }
    users.push({ id, login, pass, fullName, defBalance, defRole, defTempRole, defShopId, defLoan });
    return res.status(200).json({ message: "User create" })
})

app.post("/auth", (req, res) => {
    const { login, pass } = req.body;
    const useri = users.find(el => el.login === login && el.pass == pass);
    const indUseri = users.findIndex(el => el.login === login && el.pass == pass);
    if (useri) {
        return res.status(200).json({ message: users[indUseri] });
    }
    return res.status(500).json({ error: "Undefined" });
})

// buyes
app.post("/reqRise", (req, res) => {
    const { login, pass, shopLogin } = req.body;
    const request = reqRiseList.find(el => el === login)
    const useri = users.find(el => el.login === login && el.pass == pass)
    const shopi = users.find(el => el.login === shopLogin)
    const id = useri.id
    const index = reqRiseList.length + 1
    console.log(useri);
    console.log(reqRiseList, reqRiseList.length - 1)
    if (request || useri.role != 1 || shopi.role != 6) {
        return res.status(500).json({ error: "request already submitted || you not buyer || The store you entered does not exist" })
    }
    else if (shopi && useri) {
        reqRiseList.push({ index, login, id, shopLogin })
        console.log(reqRiseList, reqRiseList.length - 1)
        return res.status(200).json({ message: "Request submitted" })
    }
    return res.status(500).json({ message: "афыпка" })

})

app.post("/commenting", (req, res) => {
    const { login, loginShop, grade, comment } = req.body;
    const shopi = users.find(el => el.login === loginShop);
    const useri = users.find(el => el.login === login);
    const idComm = shopi.comments.length + 1;
    const answers = [];
    const like = likeDislike;
    const dislike = likeDislike;
    if (useri && shopi.role === 6 && useri && useri.role === 1) {
        shopi.comments.push({ idComm, login, grade, comment, like, dislike, answers })
        return res.status(200).json({ message: "Comment sent" })
    }
    else if (shopi.role != 6) {
        return res.status(500).json({ error: "The user you entered is not a store" })
    }
    else if (useri.role != 1) {
        return res.status(500).json({ error: "You`r not buyer" })
    }
    return res.status(500).json({ error: "No such user || no such user" })
})

// app.post("/commentings", (req, res) => {
//     const { login, loginShop, grade, comment } = req.body;
//     const shopi = users.find(el => el.login === loginShop);
//     return res.status(200).json({ message: shopi.comments })
// })
app.post("/like", (req, res) => {
    const { loginShop, idComm } = req.body;
    const shopi = users.find(el => el.login === loginShop)
    const commenti = shopi.comments.find(el => el.idComm == idComm)
    if (shopi && commenti) {
        commenti.like += 1;
        return res.status(200).json({ message: "Like!" })
    }
    return res.status(500).json({ error: "Error!" })
})
app.post("/dislike", (req, res) => {
    const { loginShop, idComm } = req.body;
    const shopi = users.find(el => el.login === loginShop)
    const commenti = shopi.comments.find(el => el.idComm == idComm)
    if (shopi && commenti) {
        commenti.dislike += 1;
        return res.status(200).json({ message: "Dislike!" })
    }
    return res.status(500).json({ error: "Error!" })
})



// bank
app.post("/getLoan", (req, res) => {
    const { index } = req.body
    const request = reqLoan.find(el => el.index === index)
    const useri = users.find(el => el.login === request.login && el.id === request.id)
    if (useri) {
        useri.balance += 1000;
        useri.loan += 1000;
        return res.status(200).json({ message: "Get loan!"})
    }
    return res.status(500).json({error: "Error!"})
})

app.delete("/getLoan", (req, res) => {
    const { index } = req.body
    const request = reqLoan.find(el => el.index === index)
    const useri = users.find(el => el.login === request.login && el.id === request.id)
    if (useri) {
        users.splice(ind, 1);
        return res.status(200).json({message: "Delete!"})
    }
    return res.status(200).json({ message: `You get loan. You owe the bank ${useri.loan}. Your balance ${useri.balance}` })

})


// shops
app.post("/reqLoan", (req, res) => {
    const { login, pass } = req.body;
    const request = reqLoan.find(el => el === login)
    const useri = users.find(el => el.login === login && el.pass == pass)
    const id = useri.id
    const index = reqLoan.length + 1
    if (request || useri.role != 6) {
        return res.status(500).json({ error: "request already submitted or you not a shop" })
    }
    reqLoan.push({ index, login, id })
    console.log(reqLoan, reqLoan.length - 1)
    return res.status(200).json({ message: "Request submitted" })
})

//sellers
app.post("/reqDowngrade", (req, res) => {
    const { login, pass } = req.body;
    const request = reqDowngrade.find(el => el === login)
    const useri = users.find(el => el.login === login && el.pass == pass)
    const index = reqDowngrade.length + 1
    const id = useri.id
    console.log(useri);
    if (request || useri.role != 2) {
        return res.status(500).json({ error: "request already submitted or you not seller" })
    }
    reqDowngrade.push({ index, login, id })
    console.log(reqDowngrade, reqDowngrade.length - 1)
    return res.status(200).json({ message: "Request submitted" })
})

app.put("/sellersOnTheBuyer", (req, res) => {
    const { login, pass } = req.body;
    const useri = users.find(el => el.login === login && el.pass === pass);
    console.log(useri)
    if (useri && useri.role === 2) {
        useri.tempRole = 1;
        return res.status(200).json({ message: "Role changed" })
    }
    return res.status(500).json({ error: "Undefined acc" })
})
app.put("/becomeASeller", (req, res) => {
    const { login, pass } = req.body;
    const useri = users.find(el => el.login === login && el.pass === pass);
    console.log(useri)
    if (useri && useri.role === 2) {
        useri.tempRole = 2;
        return res.status(200).json({ message: "Role changed" })
    }
    return res.status(500).json({ error: "Undefined acc" })
})

app.post("/replyComm", (req, res) => {
    const { loginSeller, loginShop, idComm, reply } = req.body;
    const shopi = users.find(el => el.login === loginShop)
    const selleri = users.find(el => el.login === loginSeller)
    const commenti = shopi.comments.find(el => el.idComm == idComm)
    if (shopi || selleri.role == 6 || commenti) {
        commenti.answers.push({ loginSeller, reply })
        return res.status(200).json({ message: "Reply!" })
    }
    else if (selleri.role != 6) {
        return res.status(500).json({ error: "You`r not a seller" })
    }
    return res.status(500).json({ error: "not found shop || not found comment || UNDEFINED LOGIN" })



})

// admin

app.put("/adminOnTheBuyer", (req, res) => {
    const { login, pass } = req.body;
    const useri = users.find(el => el.login === login && el.pass === pass);
    console.log(useri)
    if (useri && useri.role === 5) {
        useri.tempRole = 1;
        return res.status(200).json({ message: "Role changed" })
    }
    return res.status(500).json({ error: "Undefined acc" })
})
app.put("/becomeAAdmin", (req, res) => {
    const { login, pass } = req.body;
    const useri = users.find(el => el.login === login && el.pass === pass);
    console.log(useri)
    if (useri && useri.role === 5) {
        useri.tempRole = 5;
        return res.status(200).json({ message: "Role changed" })
    }
    return res.status(500).json({ error: "Undefined acc" })
})
app.put("/addSellers", (req, res) => {
    const { index, login } = req.body;
    const requesti = reqRiseList.find(el => el.index == index && el.login === login)
    const useri = users.find(el => el.login === requesti.login)
    const shopi = users.find(el => el.login === requesti.shopLogin)
    const userId = useri.id
    const city = shopi.city;
    console.log(useri)
    if (requesti && shopi && useri) {
        useri.role = 2
        useri.tempRole = 2
        useri.shopId = shopi.id
        useri.city = city
        shopi.sellers.push({ userId, login })
        return res.status(200).json({ message: "Upgrade!" })
    }
    return res.status(500).json({ message: "Error!" })
})
app.put("/downgradeSellers", (req, res) => {
    const { index, login } = req.body;
    const requesti = reqDowngrade.find(el => el.index == index && el.login === login)
    const useri = users.find(el => el.login === requesti.login)
    console.log(useri)
    if (requesti && useri) {
        useri.role = 1
        useri.tempRole = 1
        useri.shopId = 0
        return res.status(200).json({ message: "Downgrade!" })
    }
    return res.status(500).json({ message: "Error!" })
})
app.put("/addAdmin", (req, res) => {
    const { id, login } = req.body
    const useri = users.find(el => el.id == id && el.login === login)
    console.log(useri)
    console.log(admins)
    if (useri.role != 5) {
        useri.role = 5
        useri.tempRole = 5
        admins.push({ id, login })
        return res.status(200).json({ message: "Admin add!" })
    }
    return res.status(500).json({ error: "Error!" })
})
app.put("/regShop", (req, res) => {
    const { id, login, city } = req.body
    const useri = users.find(el => el.id == id && el.login === login)
    console.log(useri)
    if (useri.role != 6) {
        useri.role = 6
        useri.tempRole = 6
        useri.city = city
        useri.comments = []
        useri.sellers = []
        return res.status(200).json({ message: "Shop added!" })
    }
    return res.status(500).json({ error: "Error!" })
})

app.delete("/delShop", (req, res) => {
    const { loginShop, idShop } = req.body;
    const shopi = users.find(el => el.login === loginShop && el.id == idShop)
    const ind = users.findIndex(el => el.login === loginShop)
    if (shopi.role == 6) {
        users.splice(ind, 1);
        return res.status(200).json({ message: "Delete!" })
    }
    return res.status(500).json({ message: "Error!" })
})

//примеры отдельно

app.put("/change", (req, res) => {
    const { login, pass, changePass } = req.body;
    const useri = users.find(el => el.login === login && el.pass == pass);
    console.log(useri)
    if (useri) {
        useri.pass = changePass;
        return res.status(200).json({ message: "password changed" })
    }
    return res.status(500).json({ error: "Undefined acc" })
})

app.delete("/delete", (req, res) => {
    const { login, pass } = req.body;
    const useri = users.find(el => el.login === login && el.pass == pass);
    const IND = users.findIndex(el => el.login === login);
    if (useri) {
        users.splice(IND, 1);
        return res.status(200).json({ message: "delete success" })
    }
    return res.status(500).json({ error: "vse gavno" })
})

app.get("/get", (req, res) => {
    const login = req.query.login;
    const loan = req.query.loan;
    const ind = users.find(el => el.login === login);
    console.log(login);
    ind.balance += loan;
    ind.loan += loan;
    return res.status(200).json({ message: `You get loan. You owe the bank ${ind.loan}. Your balance ${ind.balance}` })
})

app.listen(3000, () => {
    console.log("Yes -3 yoyxo")
})