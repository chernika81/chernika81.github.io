// Save the url in variable
//const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Open init() function for the dropdown and the gauge chart
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
  
    // Initial gauge chart
    gaugechart(name1);
  
  });
  };

  // Build the gauge chart
function gaugechart(nextSample) {
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
  };
  
  // 
  function optionChanged(nextSample) {
    metadataobj(nextSample);
    barchart(nextSample);
    bubblechart(nextSample);
    gaugechart(nextSample);
    };
init();
  