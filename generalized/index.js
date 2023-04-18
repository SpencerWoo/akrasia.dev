const express = require('express')
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express()
const port = 3000

URL_PATH = 'localhost:3000'

const html_snippet = `
<!doctype html>
<html>
<head><title>Generalized</title></head>
<body>
  <h1>`

const html_with_g_tag = `
<!doctype html>
<html>
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G2866C0GYE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-G2866C0GYE');
</script>
<title>Generalized</title></head>
<body>
  <h1>`

app.get('/', (req, res) => {
  const html_home = `Welcome to the Generalized</h1>
<p>This site is a one-stop-shop for all your information needs.  We have information on <a href="/health">health</a>, <a href="/finance">finance</a>, <a href="/technology">technology</a>, <a href="/sports">sports</a>, and more</p>`;

  res.send(html_with_g_tag + html_home)
})

// JSON API
app.get('/api/*', async (req, res) => {
  const CUR_PATH = req.originalUrl.slice(5)

  res.send(await json(CUR_PATH))
})

app.get(/\w\.\w+$/, async (req, res) => {
  const CUR_PATH = req.path.slice(1);
  const {ct, body} = await generalized(CUR_PATH)

  res.setHeader('Content-Type', ct)
  res.send(body)
})

// HTML API
app.get('*', async (req, res) => {
  const CUR_PATH = req.path.slice(1);
  res.send(await html(CUR_PATH))
})

async function generalized(CUR_PATH){
  console.log('generalized');
  const generalized_prompt = `Create a response document with content that matches the URL path: ${URL_PATH}

The first line is the Content-Type of the response.
The following lines is the returned data.
In the case of an HTML response, also add relative path links to related topics.

Content-Type:
`

  const {data} = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generalized_prompt.replaceAll(URL_PATH, CUR_PATH),
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const response = data.choices[0].text
  const idx = response.indexOf("\n");

  return {
    "ct": response.substring(0, idx), 
    "body": response.slice(idx)
  }
}

async function json(CUR_PATH){
  console.log('json');
  const json_snippet = `
  {
    "origin": "generalized",
  `;

  const json_prompt = `Create a JSON API response that matches ${URL_PATH}` + json_snippet;
  res.setHeader('Content-Type', 'application/json')

  const {data} = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: json_prompt.replaceAll(URL_PATH, CUR_PATH),
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return json_snippet + data.choices[0].text
}

async function html(CUR_PATH){
  console.log('html');
  const html_prompt = `Create a HTML document with content on ${URL_PATH}.  In a separate section also add relative path links to related topics.

` + html_snippet;

  const {data} = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: html_prompt.replaceAll(URL_PATH, CUR_PATH),
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return html_with_g_tag + data.choices[0].text
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})