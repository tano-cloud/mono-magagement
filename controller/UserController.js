const express = require('express');
const logic = require('../logic/logic');
const viewUsers = './users/';
const passport = require("passport");

module.exports = {
    displayMono: (req, res, next) => {
        logic.displayHome(req).then((data) => {
            res.render(viewUsers + 'mono', data);
        });
    },
    addMono: (req, res, next) => {
        logic.addMono(req).then((data) => {
            res.redirect('/');
        });
    },

    getSignUp: (req, res, next) => {
        logic.getSignUp().then((data) => {
            res.render(viewUsers + 'signup', data);
        });
    },

    postSignUp: (req, res, next) => {
        logic.postSignUp(req, res).then((data) => {
            res.render(viewUsers + 'signup', data);
        });
    },

    getSignIn: (req, res, next) => {
        logic.getSignIn(req).then((data) => {
            res.render(viewUsers + 'signin', data);
        });
    },

    getLogOut: (req, res, next) => {
        logic.getLogOut(req, res).then((data) => {
            res.redirect('/');
        })
    },

    postDelete: (req, res, next)=>{
        logic.postDelete(req, res).then((data)=>{
            res.redirect('/');
        })
    },

    postEdit: (req, res, next)=>{
        logic.postEdit(req, res).then((data)=>{
            res.redirect('/');
        })
    },

    postExpire: (req, res, next)=>{
        logic.postExpire(req, res).then((data)=>{
            res.render(viewUsers + 'mono', data);
        })
    }
}

