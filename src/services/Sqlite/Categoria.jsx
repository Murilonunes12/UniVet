import db from './DataBaseConnection';



const createCategoria = (categoria, color, fontColor, fontSize) => {

  
  return new Promise((resolve, reject) =>{

   db.transaction((tx) => {
       tx.executeSql(
         "INSERT INTO categoria (name, color , legendFontColor, legendFontSize) values (?,?,?,?)",
         [categoria, color, fontColor, fontSize],
         (_, { rowsAffected, insertId }) => {
           if (rowsAffected > 0) resolve(rowsAffected,insertId);
           else reject("Error inserting categoria: " + JSON.stringify(categoria)); // insert falhou
         },
         (_, error) => reject(error) // erro interno em tx.executeSql
       );
   });

  });  
};

const selectAll = () => {
  return new Promise ((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql("SELECT idCategoria, name FROM categoria" ,[],
              (_, { rows }) => resolve(rows._array),
              (_, error) => reject(error) // erro interno em tx.executeSql
          );
      });
  });
};

const selectAllObj = () => {
  return new Promise ((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql("SELECT * FROM categoria" ,[],
              (_, { rows }) => resolve(rows._array),
              (_, error) => reject(error) // erro interno em tx.executeSql
          );
      });
  });
};

const updateCategory = (id, name) => {
  return new Promise((resolve, reject) => {
       
      db.transaction((tx) => {
           tx.executeSql("UPDATE categoria SET name=? WHERE idCategoria=?;", [name, id],
           
              (_, { rowsAffected }) => {
                  if (rowsAffected > 0) resolve(rowsAffected);
                  else reject("Error updating obj: id=" + id); // nenhum registro alterado
              },
              (_, error) => reject(error) // erro interno em tx.executeSql
          );
      });

  });
};

const findbyid= (id) =>{
  return new Promise((resolve,reject) => {
     db.transaction((tx) => {
         tx.executeSql("SELECT name FROM categoria WHERE idCategoria=?;", [id],

          (_, { rows }) => {
              if (rows.length > 0) resolve(rows._array);
              else reject("Obj not found"); // nenhum registro encontrado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
         );
     });
  });
};


const deletebyid = (id) => {
  return new Promise((resolve,reject) => {
      db.transaction((tx) => {
          tx.executeSql("DELETE FROM categoria WHERE idCategoria=?;", [id],
          
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) resolve(rowsAffected);
              },
              (_, error) => reject(error) // erro interno em tx.executeSql
              
          );
      });
  });
};


const selectCountAllCategories = () => {
  return new Promise ((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql("SELECT count(idCategoria) as quantidade FROM categoria;" ,[],
              (_, { rows }) => resolve(rows._array),
              (_, error) => reject(error) // erro interno em tx.executeSql
          );
      });
  });
}

export default {
  createCategoria,
  selectAll,
  findbyid,
  deletebyid,
  selectCountAllCategories,
  updateCategory,
  selectAllObj
}