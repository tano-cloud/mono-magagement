const mysql = require('mysql'),
    bcrypt = require('bcrypt'),
    passport = require("passport"),
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'todo_app',
        dateStrings: 'date' /*または'true'*/,
    });

//sql connect
connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return
    }
    console.log('success');
});

module.exports = {
    displayHome: (req) => {
        return new Promise((resolve, reject) => {
            const isAuth = req.isAuthenticated();
            if (isAuth) {
                const userid = req.user.id;
                connection.query('SELECT * from tasks where user_id = ?', userid, function (error, results) {
                    if (error !== null) {
                        data = {
                            title: 'Error',
                            isAuth: isAuth,
                        };
                        console.log(error)
                        resolve(data);
                    }
                    else {
                        data = {
                            title: 'ToDo App',
                            todos: results,
                            isAuth: isAuth,
                        };
                        resolve(data);
                    }
                })
            }
            else {
                data = {
                    title: 'ToDo App',
                    isAuth: isAuth,
                };
                resolve(data);
            }
        });
    },
    addMono: (req) => {
        return new Promise((resolve, reject) => {
            const todo = req.body.add,
                userId = req.user.id,
                objStart = req.body.date1,
                objEnd = req.body.date2,
                isAuth = req.isAuthenticated(),
                // getTimeの出力はミリ秒
                postDay = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
            data = {
                title: 'a',
            },
                data_obj = {
                    user_id: userId,
                    content: todo,
                    obj_start: objStart,
                    obj_end: objEnd,
                    post_day: postDay
                };

            connection.query('INSERT INTO tasks set ?', data_obj, function (error, results) {
                if (error !== null) {
                    console.log(error)
                }
                else {
                    resolve(data)
                }
            });

        });
    },
    getSignUp: (req) => {
        return new Promise((resolve, reject) => {
            data = {
                title: 'Sign up',
            }
            resolve(data)
        });
    },
    postSignUp: (req, res) => {
        return new Promise((resolve, reject) => {
            const username = req.body.username,
                password = req.body.password,
                repassword = req.body.repassword,
                isAuth = req.isAuthenticated();

            connection.query('SELECT * from users where name = ?', username, async function (error, results) {
                if (results.length !== 0) {
                    data = {
                        title: "Sign up",
                        errorMessage: ["このユーザ名は既に使われています"],
                        isAuth: isAuth,
                    }
                    resolve(data);
                }
                else if (password === repassword) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const data_obj = {
                        name: username,
                        password: hashedPassword,
                    };
                    connection.query('INSERT INTO users set ?', data_obj, function (error, results) {
                        res.redirect("/");
                    })
                }
                else {
                    data = {
                        title: "Sign up",
                        errorMessage: ["パスワードが一致しません"],
                        isAuth: isAuth,
                    }
                    resolve(data);
                }
            })
        });
    },

    getSignIn: (req, res) => {
        return new Promise((resolve, reject) => {
            const isAuth = req.isAuthenticated();
            data = {
                title: 'Sign In',
                isAuth: isAuth
            }
            resolve(data)
        });
    },

    getLogOut: (req, res) => {
        return new Promise((resolve, reject) => {
            req.logout();
            data = {
                title: 'Log out',
            }
            resolve(data)
        });
    },

    postDelete: (req, res) => {
        return new Promise((resolve, reject) => {
            console.log(req.body.id);
            let userid = req.body.id;
            connection.query(`DELETE From tasks WHERE id = ?`, userid, async function (error, results) {
                res.redirect('/');
            });
        })
    },

    postSort: (req, res) => {
        return new Promise((resolve, reject) => {
            const isAuth = req.isAuthenticated(),
            sort_number = Number(req.body.number);
            if (isAuth) {
                const userid = req.user.id;
                connection.query('SELECT * from tasks where user_id = ?', userid, function (error, results) {
                    if (error !== null) {
                        data = {
                            title: 'Error',
                            isAuth: isAuth,
                        };
                        console.log(error)
                        resolve(data);
                    }
                    else {
                        let json = JSON.stringify(results),
                            item = JSON.parse(json);
                        //降順
                        console.log(sort_number)
                        switch (sort_number) {
                            case 1:
                                item.sort((a, b) => (new Date(b.obj_end).getTime() - new Date(a.obj_end).getTime()));
                                console.log('a')
                                break;
                            case 2:
                                item.sort((a, b) => (new Date(a.obj_end).getTime() - new Date(b.obj_end).getTime()));
                                console.log('a')
                                break;
                            case 3:
                                item.sort((a, b) => (new Date(b.obj_start).getTime() - new Date(a.obj_start).getTime()));
                                console.log('b')
                                break;
                            case 4:
                                item.sort((a, b) => (new Date(a.obj_start).getTime() - new Date(b.obj_start).getTime()));
                                console.log('b')
                                break;
                            case 5:
                                console.log('c')
                                item.sort((a, b) => (new Date(b.post_day).getTime() - new Date(a.post_day).getTime()));
                        }

                        data = {
                            title: 'ToDo App',
                            todos: item,
                            isAuth: isAuth,
                        };
                        resolve(data);
                    }
                })
            }
            else {
                data = {
                    title: 'ToDo App',
                    isAuth: isAuth,
                };
                resolve(data);
            }
        });
    },
}

