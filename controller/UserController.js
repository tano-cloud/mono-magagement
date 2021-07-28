const express = require('express');
const logic = require('../logic/logic');
const viewUsers = './users/';
const passport = require("passport");

module.exports = {
    displayTodo: (req, res, next) => {
        logic.displayHome(req).then((data) => {
            res.render(viewUsers + 'todo', data);
        });
    },
    addTodo: (req, res, next) => {
        logic.addTodo(req).then((data) => {
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
    }
}

