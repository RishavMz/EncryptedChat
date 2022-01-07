import { conn } from './connection';

function createTables(){
    await conn.query('CREATE TABLE USERS(ID INT AUTO_INCREMENT PRIMARY KEY, USERNAME VARCHAR(255), FIRSTNAME VARCHAR(255), LASTNAME VARCHAR(255), PASSWORD VARCHAR(511), EMAIL VARCHAR(255), ABOUT VARCHAR(500), PROFILE_PIC VARCHAR(255), REGISTERED_ON DATETIME)', (error, result)=>{
        if(error){
            throw error;
        } else {
            console.log("Result : "+ result);
        }
    }).then(()=>{
        await conn.query('CREATE TABLE MESSAGES(ID INT AUTO_INCREMENT PRIMARY KEY, SENDER_ID INT FOREIGN KEY REFERENCES USERS(ID), RECEIVER_ID INT FOREIGN KEY REFERENCES USERS(ID), READ BOOL, SENT_AT DATETIME)', (error, result)=>{
            if(error){
                throw error;
            } else {
                console.log("Result : "+ result);
            }
        })
        await conn.query('CREATE TABLE PUBLIC_KEYS(ID INT AUTO_INCREMENT PRIMARY KEY, USER_ID INT FOREIGN_KEY REFERENCES USERS(ID) UNIQUE, KEY TEXT, CREATED_AT DATETIME)', (error, result)=>{
            if(error){
                throw error;
            } else {
                console.log("Result : "+ result);
            }
        })
        await conn.query('CREATE TABLE PRIVATE_KEYS(ID INT AUTO_INCREMENT PRIMARY KEY, USER_ID INT FOREIGN_KEY REFERENCES USERS(ID) UNIQUE, KEY TEXT, CREATED_AT DATETIME)', (error, result)=>{
            if(error){
                throw error;
            } else {
                console.log("Result : "+ result);
            }
        })
    })
}

module.exports = {createTables};