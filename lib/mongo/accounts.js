import clientPromise from ".";
import { MONGODB_URI,  MONGODB_DB } from '../../config';

let client
let db
let accounts

async function init() {
    if(db) return
    try{
        client = await clientPromise
        db = await client.db(MONGODB_DB)
        accounts = await db.collection('accounts')
    } catch(error){
        throw new Error("Failed to establish connection to database")
    }
}

;(async() => {
    await init();
})()


/////////////
//Accounts///
/////////////


export async function getAccounts(userid){
    try{
        if(!accounts) await accounts
        const result = await accounts.find({'user':userid}).toArray()
        
        return {accounts: result}
    }catch(error){
        console.log(error)
        throw new Error("Failed to fetch accounts")
    }
}