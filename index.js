const express = require('express');
const app = express();
const supabaseClient = require('@supabase/supabase-js');
const port = 3000;
const bodyParser = require('body-parser');

const supabaseUrl = 'https://akeagsmhttfgmwpcetpn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZWFnc21odHRmZ213cGNldHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NjM2NzksImV4cCI6MjA0OTUzOTY3OX0.gyjZQYH_ST9ct4MMV8kuKFyiQPnP4pK4As6lekyZIsU';

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/home', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('public/about.html', { root: __dirname });
});

app.get('/functionality', (req, res) => {
    res.sendFile('public/functionality.html', { root: __dirname });
});

app.get('/cities', async (req, res) => {
    const { data, error } = await supabase
        .from('cities')
        .select('*');


    res.send(data);
});

app.post('/city', async (req, res) => {


    const cityName = req.body.city_name;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const {data, error} = await supabase
        .from('cities')
        .insert([{city_name: cityName, latitude: latitude, longitude: longitude}])
        .select();

    if (error) {
        res.send('Error inserting city:' + error.message);
    } else {
        res.send('City inserted successfully');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    });

