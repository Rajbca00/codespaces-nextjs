import { getAccounts } from "../../../lib/mongo/accounts";

const handler = async (req,res)=>{
    if(req.method === 'GET'){
        try{
            const {accounts, error} = await getAccounts('rajbca00@gmail.com')
            if(error) throw new Error(error)

            return res.status(200).json({accounts})
        }catch(error) {
            return res.status(500).json({error:error.message})
        }
    }

    res.setHeader('Allow',['GET'])
    res.status(425).end(`Method $[req.method] is not allowed`)
}

export default handler