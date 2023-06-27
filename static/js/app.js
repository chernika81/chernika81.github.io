// Save the url in variable
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Display the default plots and metadata objects box
function init() {
  let dropdown = d3.select('#selDataset');
  // Fetch the JSON data
  d3.json(url).then((data) => {

  // Save the names in a variable
  let names = data.names;

  // Loop through the names
  for (let i = 0; i < names.length; i++){
  //names.forEach((name) => {

    // Append the names to the dropdown
    dropdown.append('option').text(names[i]).property('value');
    console.log(names[i]);
  };
  // Save the first name in a variable
  let name1 = names[0];

  // Initial plots and the metadata objects box
  metadataobj(name1);
  barchart(name1);
  bubblechart(name1);
  //gaugechart(name1);

});
};

// Build the metadata objects box
function metadataobj(nextSample) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(data);

  let metadata = data.metadata;
  let results = metadata.filter(sampleObj => sampleObj.id == nextSample);
  let result = results[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (key in result){
      panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };
});

};
// Checking if the metadata object panel is working
// function optionChanged(nextSample) {
 // metadataobj(nextSample);


// Building a bar chart
function barchart(nextSample) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    // Console log it
    console.log(data);
  // Set a variable for samples
  let samples = data.samples;
  let filtered = samples.filter((sample) => sample.id == nextSample);
  // The first filtered sample variable
  let filtered1 = filtered[0];

  // Trace the bar chart data
  let trace = [{
    x: filtered1.sample_values.slice(0,10). reverse(),
    y: filtered1.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
    text: filtered1.otu_labels.slice(0,10). reverse(),
    type: 'bar',
    orientation: 'h'
  }];

  // Plot the data using Plotly
  Plotly.newPlot('bar', trace);
  });

};

// Checking if the bar chart is working
// function optionChanged(nextSample) {
 // metadataobj(nextSample);
 // barchart(nextSample);

   

// Building a bubble chart
function bubblechart(nextSample) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    // Console log it
    console.log(data);
    // Set a variable for samples
    let samples = data.samples;
    let filtered = samples.filter((sample) => sample.id == nextSample);
    // The first filtered sample variable
    let filtered1 = filtered[0];
    
    // Trace the bubble chart data
    let trace = [{
      x: filtered1.otu_ids,
      y: filtered1.sample_values,
      text: filtered.otu_labels,
      mode: 'markers',
      marker: {
       color: filtered1.otu_ids,
       size: filtered1.sample_values,
       colorscale: 'Jet'
      }
    }];

    // x axis title
    let layout = {
      xaxis: {title: 'OTU ID'}
    };

    // Plot the data using Plotly
    Plotly.newPlot('bubble', trace, layout);
  });
};


// Build the gauge chart
/*function gaugechart(nextSample) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
      console.log(data);

      let metadata = data.metadata;
      let results = metadata.filter(sampleObj => sampleObj.id == nextSample);

      // Console log results
      console.log(results);

      let result = results[0];

     // Set a variable for the washing frequency 
     let wfreq = Object.values(result)[6];

     // Trace the gauge chart data
     let trace1 = [{
      domain: {x: [0,1], y: [0,1]},
      value: wfreq,
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
      textposition: 'inside',
      title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 20}},
      type: 'indicator',
      mode: 'gauge+number',
      gauge: {
          axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
          //colorscale: 'Greens',
          steps: [
              {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
              {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
              {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
              {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
              {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
              {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
              {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
              {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
              {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
              {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
          ]
      }

     }];

     let layout = {
      width: 400, 
      height: 400,
      margin: {t: 0, b:0}
  };

  Plotly.newPlot("gauge", trace1, layout)

  });
};*/

// 
function optionChanged(nextSample) {
  metadataobj(nextSample);
  barchart(nextSample);
  bubblechart(nextSample);
  //gaugechart(nextSample);
  };

init();