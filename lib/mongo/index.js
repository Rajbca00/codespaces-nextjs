import {MongoClient} from 'mongodb'
import { MONGODB_URI,  MONGODB_DB } from '../../config';

const URI = MONGODB_URI
const options = {}

if (!URI) throw new Error("Please add your Mongo URI in config.js file")

let client = new MongoClient(URI,options)
let clientPromise

if(process.env.NODE_ENV !== 'production'){
    if(!global._mongoClientPromise){
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._mongoClientPromise
} else{
    clientPromise = client.connect()
}


export default clientPromise