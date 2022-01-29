function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log("print")
        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var sampleData = data.samples;

        // 4. Create a variable that filters the samples for the object with the desired sample number.
        var buildingArray = sampleData.filter(sampleObj => sampleObj.id == sample);

        //  5. Create a variable that holds the first sample in the array.
        var result = buildingArray[0];

        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var otu_ids = result.otu_ids;
        var otu_labels = result.sample_values;
        var sample_values = result.sample_values;

        // 7. Create the yticks for the bar chart.
        // Hint: Get the the top 10 otu_ids and map them in descending order  
        //  so the otu_ids with the most bacteria are last. 

        var yticks = otu_ids.slice(0, 10).map(otu => 'OTU ${otuID}').reverse();

        // 8. Create the trace for the bar chart. 
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];
        // 9. Create the layout for the bar chart. 
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };
        // 10. Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar", barData, barLayout)
    });
};



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
        var yticks = otu_ids.slice(0, 10).map(otu => 'OTU ${otuID}').reverse();

        // // Use Plotly to plot the bar data and layout.
        // Plotly.newPlot("bar", barData, barLayout);

        // // Use Plotly to plot the bubble data and layout.
        // Plotly.newPlot("bubble", bubbleData, bubbleChart);


        // 4. Create the trace for the gauge chart.
        var gaugeData = [
            {
                domain: { x: [0, 10], y: [0, 1] },
                value: wfreq, //washing frequency
                title: { text: "Washing Frequency" },
                type: "indicator",

                mode: "gauge+number+delta",
                delta: { reference: 4, increasing: { color: 'green' } },
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "#000082" },
                    bar: { color: 'blue' },
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
                        line: { color: "grey", width: 4 },
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
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
        };

        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    });
}



//Build function to read json file using d3
function buildMetaData(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);

        // Filter the data
        var buildingArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = buildingArray[0];

        // Use d3 to select the required panel
        var panelData = d3.select("#sample-metadata");

        // Clear the existing data in the html
        panelData.html("");

        // Use `Object.entries` to add each key and value pair to the panelData
        Object.entries(result).forEach(([key, value]) => {
            panelData.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        console.log(data);


        //create a variable that hold the samples array///
        var sampleData = data.samples;
        //create a variable that filter the samples for the object with desired sample number //
        var sampleDataArray = sampleData.filter(sampleObj => sampleObj.id == sample);
        // 1. Create a variable that filters the metadata array for the object with the desired sample number.
        var metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var metadataResult = metadataArray[0];
        // Create a variable that holds the first sample in the array.
        var sampleDataResult = sampleDataArray[0];
        // 2. Create a variable that holds the first sample in the metadata array.    
        let filteredMetaSample = metadata.filter(sampleName => sampleName.id == sample)[0]

        // Create variables that hold the otu_ids, otu_labels, and sample_values.
        let otu_ids = sampleDataResult.otu_ids
        let otu_labels = sampleDataResult.otu_labels
        let sample_values = sampleDataResult.sample_values
        // // 3. Create a variable that holds the washing frequency.
        
        // Create the yticks for the bar chart.
        var yticks = otu_ids.slice(0, 10).map(otu => 'OTU ${otuID}').reverse();


        // Build a Bubble Chart /////////
        var bubbleChart = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
        };
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleChart);

        //Create a horizontal bar chart //////////
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var chartLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, chartLayout);
    });
};


        // 5. Create the layout for the gauge chart.
        var gaugeLayout = {
            width: 200,
            height: 370,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
        };



function init() {
    // Grab a reference to the dropdown select element
    var selectDropdown = d3.select("#selDataset");

    // Populate the select options by using the list of sample names
    d3.json("samples.json").then((data) => {
        var name = data.names;

        name.forEach((sample) => {
            selectDropdown
                .append("option")
                .text(sample)
                .property("value", sample);
        })

        // Use the sample data from the list to build the plots
        var sampleData = name[0];
        buildCharts(sampleData);
        buildMetaData(sampleData);
    });
};

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetaData(newSample);
};


// Initialize the dashboard
init()