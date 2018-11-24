const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const baseUriLivre = '/api/v1/micro-book/livre';
const baseUriEmprunt = '/api/v1/micro-book/emprunt';
const APILivre = 'http://localhost:3001/api/v1/livre';
const APIEmprunt = 'http://localhost:3000/api/v1/emprunt';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//get livre
app.get(baseUriLivre, (req, response) => {
    request(APILivre, { json: true }, (err, res, body) => {
        if (err) {
            return response.status(500).json({success: false, data: err});
        }
        return response.json(body);
    });
});

//add livre
app.post(baseUriLivre, (req, response) => {
    const data = { id: req.body.id, titre: req.body.titre, auteur: req.body.auteur, resume: req.body.resume, quantite: req.body.quantite };
    if (!data.id || !data.auteur || !data.quantite || !data.resume || !data.titre) {
        return response.status(500).json({success: false, data: 'missing parameter'});
    }
    request({ url: APILivre, method: 'POST', json: data}, (err, res, body) => {
        if (err) {
            return response.status(500).json({success: false, data: err});
        }
        return response.json(body);
    });
});

//edit livre
app.put(baseUriLivre, (req, response) => {
    const data = { id: req.body.id, titre: req.body.titre, auteur: req.body.auteur, resume: req.body.resume, quantite: req.body.quantite };
    if (!data.id || !data.auteur || !data.quantite || !data.resume || !data.titre) {
        return response.status(500).json({success: false, data: 'missing parameter'});
    }
    request({ url: APILivre, method: 'PUT', json: data}, (err, res, body) => {
        if (err) {
            return response.status(500).json({success: false, data: err});
        }
        return response.json(body);
    });
});

//delete livre
app.delete(baseUriLivre, (req, response) => {
    const data = { id: req.body.id };
    if (!data.id ) {
        return response.status(500).json({success: false, data: 'missing parameter'});
    }
    request({ url: APILivre, method: 'DELETE', json: data}, (err, res, body) => {
        if (err) {
            return response.status(500).json({success: false, data: err});
        }
        return response.json(body);
    });
});

/*##########################################################################################*/

function getLivre(livres, id) {
    ret = null;
    livres.forEach(function(element) {
        if (element.id==id) {
            ret = element;
        }
    });
    return ret;
}

function getEmprunt(emprunts, id) {
    ret = null;
    emprunts.forEach(function(element) {
        if (element.id==id) {
            ret = element;
        }
    });
    return ret;
}

//get emprunt
app.get(baseUriEmprunt, (req, response) => {
    request(APIEmprunt, { json: true }, (err, res, body) => {
        if (err) {
            return response.status(500).json({success: false, data: err});
        }
        return response.json(body);
    });
});

//add emprunt
app.post(baseUriEmprunt, (req, response) => {
    const data = { id: req.body.id, nom: req.body.nom, prenom: req.body.prenom, livre: req.body.livre };
    if (!data.id || !data.nom || !data.prenom || !data.livre) {
        return response.status(500).json({success: false, data: 'missing parameter'});
    }

    request({ url: APILivre, method: 'GET', json: {}}, (err, res, body) => {
        if (err) {
            return response.status(500).json({success: false, data: err});
        }
        
        var livre = getLivre(body, data.id);
        if (livre && livre.quantite>0) {
            request({ url: APIEmprunt, method: 'POST', json: data}, (err, res, body) => {
                if (err) {
                    return response.status(500).json({success: false, data: err});
                }
            });
            livre.quantite=livre.quantite-1
            request({ url: APILivre, method: 'PUT', json: livre}, (err, res, body) => {
                if (err) {
                    return response.status(500).json({success: false, data: err});
                }
                return response.json("done");
            });
        }
        else{
            return response.status(500).json({success: false, data: 'livre inexistant ou pas de ce livre en stock'});
        }
        
    });
});

//delete emprunt
app.delete(baseUriEmprunt, (req, response) => {
    const data = { id: req.body.id };
    if (!data.id ) {
        return response.status(500).json({success: false, data: 'missing parameter'});
    }

    request({ url: APIEmprunt, method: 'GET', json: {}}, (err, res, body) => {
        if (err) {
            return response.status(500).json({success: false, data: err});
        }
        
        var emprunt = getEmprunt(body, data.id);
        if (emprunt) {
            request({ url: APILivre, method: 'GET', json: data}, (err, res, body) => {
                if (err) {
                    return response.status(500).json({success: false, data: err});
                }
                var livre = getLivre(body, emprunt.livre_id);
                livre.quantite=livre.quantite+1;
                request({url:APILivre, method: 'PUT', json:livre}, (err, res, body) => {
                    if(err){
                        return response.status(500).json({success: false, data: err});
                    }
                    request({url:APIEmprunt, method: 'DELETE', json:{"id":emprunt.id}}, (err, res, body) => {
                        if(err){
                            return response.status(500).json({success: false, data: err});
                        }
                        return response.json("done");
                    });
                });
            });
        }
        else{
            return response.status(500).json({success: false, data: 'emprunt inexistant'});
        }
    });
});


//update emprunt
/*app.put(baseUriEmprunt, (req, response) => {

});*/


app.listen(3002, function () {
    console.log('Example app listening on port 3002!')
})
