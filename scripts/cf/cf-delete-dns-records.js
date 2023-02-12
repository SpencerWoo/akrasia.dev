const axios = require('axios/index')
const dotenv = require('dotenv')

dotenv.config();

const {CF_API_TOKEN} = process.env;

async function getZoneId(zoneName) {
    const {data: {result}} = await axios.request({
        method: 'get',
        url: `https://api.cloudflare.com/client/v4/zones?name=${zoneName}`,
        headers: {
             "Authorization": `Bearer ${CF_API_TOKEN}`
        }
    });

    const zoneId = result[0]['id'];

    return zoneId;
}

async function getDNSRecordsWithDomain(zoneId, domain){
    const {data: {result}} = await axios.request({
        method: 'get',
        url: `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=A&name=${domain}&per_page=100`,
        headers: {
             "Authorization": `Bearer ${CF_API_TOKEN}`,
             "Content-Type": "application/json"
        }
    });

    return result;
}

async function getDNSRecordsWithIP(zoneId, ip){
    const {data: {result}} = await axios.request({
        method: 'get',
        url: `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=A&content=${ip}&per_page=100`,
        headers: {
             "Authorization": `Bearer ${CF_API_TOKEN}`,
             "Content-Type": "application/json"
        }
    });

    return result;
}

async function deleteDNSRecords(zoneId, id){
    await axios.request({
        method: 'delete',
        url: `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${id}`,
        headers: {
             "Authorization": `Bearer ${CF_API_TOKEN}`,
             "Content-Type": "application/json"
        }
    });
}

async function main(args) {
    const zoneName = 'spencers.dev';

    const zoneId = await getZoneId(zoneName);

    // const domain = args[0];
    const ip = args[0];
    const dry = args[1];

    const recordsArr = await getDNSRecordsWithIP(zoneId, ip);
    // const recordsArr = await getDNSRecordsWithDomain(zoneId, domain);

    for (let i = 0; i < recordsArr.length; i++) {
        const id = recordsArr[i]['id'];
        const name = recordsArr[i]['name'];

        if (dry) {
            console.log(`Would Removed Entry : ${name}`)
        } else {
            await deleteDNSRecords(zoneId, id);

            console.log(`Removed Entry : ${name}`)
        }
    }
}

main(process.argv.slice(2)); 