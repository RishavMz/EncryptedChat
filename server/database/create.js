const { conn } = require('./connection');

async function createTables(){
    console.log('Creating...');
    await conn.query('CREATE DATABASE IF NOT EXISTS ENCRYPTEDCHAT;', async(error, result)=>{
        if(error){
            throw error;
        } else {
            console.log( result);
            await conn.query('USE ENCRYPTEDCHAT;', async(error, result)=>{
                if(error){
                    throw error;
                } else {
                    console.log( result);
                    await conn.query('CREATE TABLE IF NOT EXISTS USERS(ID INT AUTO_INCREMENT PRIMARY KEY, USERNAME VARCHAR(255), FIRSTNAME VARCHAR(255), LASTNAME VARCHAR(255), PASSWORD VARCHAR(511), EMAIL VARCHAR(255), ABOUT VARCHAR(500), PROFILE_PIC VARCHAR(255), REGISTERED_ON DATETIME);', async(error, result)=>{
                        if(error){
                            throw error;
                        } else {
                            console.log( result);
                            await conn.query('CREATE TABLE IF NOT EXISTS MESSAGES(ID INT AUTO_INCREMENT PRIMARY KEY, SENDER_ID INT , RECEIVER_ID INT , ISREAD INT, SENT_AT DATETIME, FOREIGN KEY (SENDER_ID) REFERENCES USERS(ID), FOREIGN KEY (RECEIVER_ID) REFERENCES USERS(ID));', (error, result)=>{
                                if(error){
                                    throw error;
                                } else {
                                    console.log( result);
                                }
                            });
                            await conn.query('CREATE TABLE IF NOT EXISTS PUBLIC_KEYS(ID INT AUTO_INCREMENT PRIMARY KEY, USER_ID INT UNIQUE, KEYDATA TEXT, CREATED_AT DATETIME, FOREIGN KEY (USER_ID) REFERENCES USERS(ID));', (error, result)=>{
                                if(error){
                                    throw error;
                                } else {
                                    console.log( result);
                                }
                            });
                            await conn.query('CREATE TABLE IF NOT EXISTS PRIVATE_KEYS(ID INT AUTO_INCREMENT PRIMARY KEY, USER_ID INT UNIQUE, KEYDATA TEXT, CREATED_AT DATETIME, FOREIGN KEY (USER_ID) REFERENCES USERS(ID));', (error, result)=>{
                                if(error){
                                    throw error;
                                } else {
                                    console.log( result);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
}
console.log('Generating database schema.........');
createTables();