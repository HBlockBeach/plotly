//build function to create plots

function buildplots(input) {
//take data from json, map it to needed fields 
//add filter for change on new input
    d3.json("samples.json").then((data) => {

    
    var samples = data.samples;
    var fortables = samples.filter(sample => sample.id == input)
    var subject = fortables[0]

    const id = subject.id
    const otu = subject.otu_ids
    const name = subject.otu_labels
    const values = subject.sample_values
    
    //use function to find top 10 
    var ystuff = otu.slice(0,10).map(otu=> `OTU ${otu}`).reverse()
    
    //build bar chart
    var bardata = [{
        y: ystuff,
        x: values.slice(0,10).reverse(),
        text: name.slice(0,10).reverse(),
        type: "bar",
        orientation: 'h'
    }
];


    Plotly.newPlot("bar", bardata)
    
    //build bubble chart
    var bubbledata = [{
        x: otu,
        y: values,
        text: name,
        mode: "markers",
        marker: {
            size: values,
            color: otu
        }
    }];

    Plotly.newPlot("bubble", bubbledata)
    })
};

//build function to grab demographic data for table
function buildmetadata(input) {
    d3.json("samples.json").then((data) => {
    const metadata = data.metadata;
    var fordemos = metadata.filter(data => data.id == input);
    var subject = fordemos[0]
    
    //select sample metadata cha clear it. then populate with values for subject
    var panel = d3.select('#sample-metadata');
    panel.html("")

    Object.entries(subject).forEach(([cat,value]) => {

        panel.append("h5").text(`${cat}: ${value}`)
    })

    })
};



//function to add the ids to the dropdown and assign the value
function makeithappen() {

    var grabid = d3.select("#selDataset");

    d3.json("samples.json").then((data) =>{
        var ids = data.names;

    ids.forEach((number) => {
        grabid
            .append("option")
            .text(number)
            .property("value" , number)
    })
//build original plots
    var first =ids[0]
    buildplots(first)
    buildmetadata(first)

});
}

//function to change based on updated values
function updated(value) {
    buildplots(value);
    buildmetadata(value);

}

makeithappen()