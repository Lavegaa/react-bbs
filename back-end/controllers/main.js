const crypto = require('crypto');

const addUser = (req, res, db) => {
  const { uid, password, name, isAdmin } = req.body;

  db.select('uid').from('user').where('uid',uid)
      .then(items => {
        if(items.length){
          res.json({dataExists: 'true'})
        } else {
          let cryptopass = "";
          let cryptosalt = "";
          crypto.randomBytes(64, (err, buf) => {
            cryptosalt = buf.toString('base64');
            crypto.pbkdf2(password, cryptosalt, 100000, 64, 'sha512', (err, key) => {
              cryptopass=key.toString('base64');
            })
          });
          setTimeout(()=>{ 
            db('user').insert({
              uid: uid,
              name: name, 
              password: cryptopass,
              isAdmin: isAdmin,
              salt: cryptosalt
            })
            .returning('*')
            .then(item => {
              res.json(item)
            })
            .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
          },500)
        }
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
}

const login = (req, res, db) => {
  const { uid, password } = req.body;

  db.select('uid','salt').from('user').where('uid',uid)
      .then(items => {
        if(items.length){
          let cryptopass = "";
          crypto.pbkdf2(password, items[0].salt, 100000, 64, 'sha512', (err, key) => {
            cryptopass=key.toString('base64');
          })
          setTimeout(()=>{
            db.select('uid','name','isAdmin').from('user').where('password',cryptopass)
            .then(item=>{
              if(item.length){
                res.json(item);
              }else {
                res.json({dataExists: 'false'})
              }
            })
            .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
          },500)

        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
}

const getUser = (req, res, db) => {
  const { uid } = req.body;

  db.select('uid', 'name', 'isAdmin').from('user').where('uid',uid)
      .then(items => {
        if(items.length){
          res.json(items);
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
}

const getAllUser = (req, res, db) => {

  db.select('uid', 'name', 'isAdmin').from('user')
      .then(items => {
        if(items.length){
          res.json(items);
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
}

const deleteUser = (req, res, db) => {
  const { uid } = req.body;

  db('user').where("uid",uid).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
}

//------------------------------------------------------------------------------------------------------

 const getBoard = (req, res, db) => {
    const { user } = req.body;
    if(user==="true") {
      db.select('*').from('boardmaster').where("bd_use_at","Y")
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
    } else {
      db.select('*').from('boardmaster')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
    }
  }

  const getOneBoard = (req, res, db) => {
    const id = req.params.id
    db.select('*').from('boardmaster').where('bd_id',id)
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }
  
  const insertBoard = (req, res, db) => {
    const { bd_subject, bd_intro, bd_type, bd_use_at} = req.body;

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let today = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+01`;

    db.select('*').from('boardmaster').where('bd_subject',bd_subject)
    .then(items => {
      if(items.length){
        res.json({dataExists: 'true'})
      } else {
        db('boardmaster').insert(
          {
            bd_subject: bd_subject,
            bd_intro: bd_intro, 
            bd_type: bd_type, 
            bd_use_at: bd_use_at,
            bd_create_date: today
          })
        .returning('*')
        .then(item => {
          res.json(item)
        })
        .catch(err => res.status(400).json({dbError: `db error: ${err}`}))      
      }
    })
    .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }

  const updateBoard = (req, res, db) => {
    const { id, bd_intro, bd_type, bd_use_at } = req.body;
    db('boardmaster').where('bd_id',id).update({bd_intro, bd_type, bd_use_at})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }
  
  const deleteBoard = (req, res, db) => {
    const id = req.params.id;
    db('boardmaster').where('bd_id',id).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }

//---------------------------------------------------------------------------------

  const getPostList = (req, res, db) => {
    const { type } = req.body;
    if(type === "전체게시판") {
      db.select('*')
        .from('userboard')
        .join("boardmaster","userboard.ub_type","boardmaster.bd_subject")
        .where("boardmaster.bd_use_at","Y")
        .then(items => {
          if(items.length){
            res.json(items)
          } else {
            res.json({dataExists: 'false'})
          }
        })
        .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
    } else {
      db.select('*').from('userboard').where('ub_type',type)
        .then(items => {
          if(items.length){
            res.json(items)
          } else {
            res.json({dataExists: 'false'})
          }
        })
        .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
    }
  }

  const getOnePost = (req, res, db) => {
    const id = req.params.id
    db.select('*').from('userboard').where('ub_id',id)
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }


  const insertPost = (req, res, db) => {

    const { ub_subject, ub_type, ub_description, ub_host } = req.body;

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let today = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+01`;
    
    db('userboard').insert({
      ub_subject: ub_subject,
      ub_type: ub_type,
      ub_description: ub_description,
      ub_host: ub_host,
      ub_create_date: today,
    })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }

  const deletePost = (req, res, db) => {
    const id = req.params.id;
    db('userboard').where('ub_id',id).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }

  const updatePost = (req, res, db) => {
    const { id, ub_subject, ub_description } = req.body;
    db('userboard').where('ub_id',id).update({ub_subject, ub_description})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: `db error: ${err}`}))
  }
  
  module.exports = {
    addUser,
    login,
    getUser,
    getAllUser,
    deleteUser,
    getBoard,
    getOneBoard,
    insertBoard,
    updateBoard,
    deleteBoard,
    getPostList,
    getOnePost,
    insertPost,
    deletePost,
    updatePost
  }