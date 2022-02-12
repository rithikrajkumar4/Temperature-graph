chartIT()

async function chartIT(){
    const data = await catchData()
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xs,
        datasets: [{
            label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C',
            data: data.ys,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Northern Hemisphere Temperature in °C',
            data: data.nys,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Southern Hemisphere Temperature in °C',
            data: data.sys,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
        ]
    },
    options: {
        scales: {
            y: {
             ticks: {
                    callback: function(value, index, ticks) {
                        return value+ '°';
                    }
                }   
            }
        }
    }
});
}
async function catchData(){
    const xs = [];
    const ys = [];
    const nys = [];
    const sys = [];
    const response = await fetch('data_file.csv')
    const data = await response.text()
    console.log(data.split('\n'))
    const table = data.split('\n').slice(1)
    table.forEach(elt=>{
        const columns = elt.split(',')
        xs.push(columns[0])
        ys.push(parseFloat(columns[1])+14)
        console.log()
        nys.push(parseFloat(columns[2])+14)
        sys.push(parseFloat(columns[3])+14)

    })
    return {xs,ys,nys,sys};
}