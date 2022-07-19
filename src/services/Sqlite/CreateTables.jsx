import db from './DataBaseConnection';

const createTables = () => {

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS categoria(idCategoria INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT, legendFontColor TEXT, legendFontSize INTEGER);");
    });
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS produto(idProduto INTEGER PRIMARY KEY AUTOINCREMENT, codBar INTEGER, nome TEXT, descricao TEXT, peso REAL,quantidade INTEGER , qtMin INTEGER, valor REAL , id_categoria INTEGER, FOREIGN KEY(id_categoria) REFERENCES categoria(idCategoria) ON DELETE CASCADE);");
    });
  
    console.log('tabelas criadas!!!!')
}


const dropTables = () => {
    db.transaction((tx) => {
        tx.executeSql("DROP TABLE categoria;");
    });

    db.transaction((tx) => {
        tx.executeSql("DROP TABLE produto;");
    })
    
        
    console.log('tabelas excluidas!!!!')
    
}


export default {
    createTables,
    dropTables
}