//d3.json("samples.json").then(function(data){
  //  console.log(data)
//});



d3.json("samples.json").then((data) => {
    const samples = data.samples[0]
    const id = samples.id
    const otu = samples.otu_ids
    const name = samples.otu_labels
    const values = samples.sample_values
    
    console.log(samples)
    console.log(id)
    console.log(otu)
    console.log(name)
    console.log(values)
});
//var ystuff = otu.slice(0,10).map(otu=> `OTU ${otu}`).reverse()
var bardata = [{
    y: otu,
    x: values,
    text: name,
    type: "bar",
    orientation: 'h'

}];

Plotly.newPlot("bar", bardata)

