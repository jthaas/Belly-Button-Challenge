// Set URL

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch Json and log it

d3.json(url).then(function(data) {
    console.log(data);
});

// Set up Dashboard and add samples to menu

function init() {
    let dropdownMenu = d3.select('#selDataset');
    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            console.log(id);
            dropdownMenu.append('option')
            .text(id)
            .property('value', id);
        });

        let sampleOTU = names[0];
        console.log(sampleOTU);

// Set inital plots

        OTUmetaData(sampleOTU);
        OTUbar(sampleOTU);
        OTUbubble(sampleOTU);

    });
    
};

// Populate the Metadata

function OTUmetaData(sampleOTU) {
    d3.json(url).then((data) => {
        let Metadata = data.metadata;
        let value = Metadata.filter(result => result.id == sampleOTU);
        console.log(value);
        let Valuedata = value[0];
        d3.select('#sample-metadata').html('');

// Add Key Value pairs to panel

        Object.entries(Valuedata).forEach(([key, value]) => {
            console.log(key, value);
            d3.select('#sample-metadata').append('h5').text(`${key} : ${value}`);
        });

    });

};

// Bar Chart

function OTUbar(sampleOTU) {
    d3.json(url).then((data) => {
        let OTUsample = data.samples;
        let value = OTUsample.filter(result => result.id == sampleOTU);
        let Valuedata = value[0];

// Get individual fields values

        let otu_ids = Valuedata.otu_ids;
        let otu_labels = Valuedata.otu_labels;
        let sample_values = Valuedata.sample_values;
        console.log(otu_ids,otu_labels,sample_values);

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
// Set trace 

        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

// Create layout

        let layout = {
            title: "Top 10 OTUs"
        };

// Create Bar Chart

        Plotly.newPlot("bar", [trace], layout)
    });

};

// Bubble Chart

function OTUbubble(sampleOTU) {

    
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(result => result.id == sampleOTU);
        let Valuedata = value[0];

// Get individual fields values

        let otu_ids = Valuedata.otu_ids;
        let otu_labels = Valuedata.otu_labels;
        let sample_values = Valuedata.sample_values;
        console.log(otu_ids,otu_labels,sample_values);
        
// Set Trace

        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

// Create layout

        let layout = {
            title: " OTU Bacteria Per Sample",
            xaxis: {title: "OTU ID"},
        };

// Create Bubble Chart

        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Update Dashboard

function optionChanged(value) { 
    console.log(value); 

// Call all functions 

    OTUmetaData(value);
    OTUbar(value);
    OTUbubble(value);
  
};

// Display data/charts

init();















