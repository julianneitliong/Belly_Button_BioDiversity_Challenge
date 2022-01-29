// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);


    // Create a variable that holds the samples array. 
    var sampleData = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleDataArray = sampleData.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    // console.log("print")
    // Filter the data for the object with the desired sample number
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var metadataResult = metadataArray[0];
    // var filteredData = metadata.filter(sampleName => sampleName.id == id)[0]
    // Object.entries(filteredData).forEach(([key, value]) => {
    //   demoPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    // });
    // Create a variable that holds the first sample in the array.
    var sampleDataResult = sampleDataArray[0];

    // // 2. Create a variable that holds the first sample in the metadata array.
    let filteredMetaSample = metadata.filter(sampleName => sampleName.id == sample)[0]

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = sampleDataResult.otu_ids
    let otu_labels = sampleDataResult.otu_labels
    let samples_values = sampleDataResult.sample_values

    // 3. Create a variable that holds the washing frequency.
    var wfreq = parseFloat(metadataResult.wfreq)
  
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).map(otu=> 'OTU ${otuID}').reverse();

    // // Use Plotly to plot the bar data and layout.
    // Plotly.newPlot("bar", barData, barLayout);
    
    // // Use Plotly to plot the bubble data and layout.
    // Plotly.newPlot("bubble", bubbleData, bubbleChart);
  
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
        {
            domain: {x: [0,10], y: [0,1]},
            value: wfreq, //washing frequency
            title: {text: "Washing Frequency"},
            type: "indicator",

            mode: "gauge+number+delta",
            delta: {reference: 4, increasing: {color: 'green'} },
            gauge: {
                axis: {range: [null, 9], tickwidth: 1, tickcolor: "#000082"},
                bar: {color: 'blue'},
                steps: [
                      { range: [0, 1], color: "#fff4ed" },
                      { range: [1, 2], color: "#ffddc6" },
                      { range: [2, 3], color: "#ffc59f" },
                      { range: [3, 4], color: "#ffae78" },
                      { range: [4, 5], color: "#ff9650" },
                      { range: [5, 6], color: "#ff7e29" },
                      { range: [6, 7], color: "#ff6702" },
                      { range: [7, 8], color: "#ed5f00" },
                      { range: [8, 9], color: "#c64800" },
                ],
                threshold: {
                  line: {color: "grey", width: 4},
                  thickness: 1,
                  value: 9
                }
            },
            bgcolor: "lavender",

        }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
        width: 200,
        height: 370,
        margin: {t:25, r:25, l:25, b:25},
        paper_bgcolor: "lavender",
        font: {color: "darkblue", family: "Arial"}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
