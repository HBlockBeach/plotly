function buildplots(input) {

    d3.json("samples.json").then((data) => {

    
    var samples = data.samples;
    var fortables = samples.filter(sample => sample.id == input)
    var subject = fortables[0]

    const id = subject.id
    const otu = subject.otu_ids
    const name = subject.otu_labels
    const values = subject.sample_values
    
    var ystuff = otu.slice(0,10).map(otu=> `OTU ${otu}`).reverse()
    var bardata = [{
        y: ystuff,
        x: values.slice(0,10).reverse(),
        text: name.slice(0,10).reverse(),
        type: "bar",
        orientation: 'h'
    }
];

    Plotly.newPlot("bar", bardata)
    
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

function buildmetadata(input) {
    d3.json("samples.json").then((data) => {
    const metadata = data.metadata;
    var fordemos = metadata.filter(data => data.id == input);
    var subject = fordemos[0]
    
    var panel = d3.select('#sample-metadata');
    panel.html("")

    Object.entries(subject).forEach(([cat,value]) => {

        panel.append("h5").text(`${cat}: ${value}`)
    })

    })
};




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

    var first =ids[0]
    buildplots(first)
    buildmetadata(first)

});
}

function updated(value) {
    buildplots(value);
    buildmetadata(value);

}

makeithappen()