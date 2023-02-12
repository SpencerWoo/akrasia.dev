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

async function createDNSRecords(zoneId, ip, name, type){
    await axios.request({
        method: 'post',
        url: `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
        headers: {
             "Authorization": `Bearer ${CF_API_TOKEN}`,
             "Content-Type": "application/json"
        },
        data: {
            type: `${type}`,
            name: `${name}`,
            content: `${ip}`,
            ttl: 1,
            priority: 10,
            proxied: true
        }
    }).catch(function (error) {
        console.log('View https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record for a list of valid values.');

        console.log('Error ' + error.message);
    });
}

async function main(args) {
    const ip = args[0];
    const name = args[1] || 'x';
    const type = args[2] || 'A';

    const zoneName = 'akrasia.dev';
    const zoneId = await getZoneId(zoneName);

    await createDNSRecords(zoneId, ip, name, type);

    console.log(`Created Entry : ${name}`)
}

main(process.argv.slice(2)); 