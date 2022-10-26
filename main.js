var staticUrl= 'https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1'
$.getJSON(staticUrl, function(data){
    const groupBy =  (predicate, array) => array.reduce((r, o) => {
        r[+predicate(o)].push(o);
        return r;
    }, [[], []]);
    data.forEach(item => {
        if(item.weight === undefined){
            item.weight = 'N/A';
        } else{
            item.weight = item.weight + 'g';
        }
    });


    data.forEach(item => {
        item.description = item.description.substring(0, 10) + '...';
    });

        const [domestic, imported] = groupBy(o => o.domestic !== true, data)

    console.log('Domestic',domestic.sort((a, b) => {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }));
        console.log('Imported',imported.sort((a, b) => {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }));

    function formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

        let total=0;
        domestic.forEach(item =>
        {
            total+= item.price;
        });
        console.log('Domestic cost:', formatMoney(total));

    let sum=0.0;
    imported.forEach(item =>
    {
        sum+= item.price;
    });
    console.log('Imported cost:', formatMoney(sum));

    data.forEach(item =>{
        item.price= formatMoney(item.price);
    })

    console.log('Domestic count:', domestic.length);
    console.log('Imported count:', imported.length);

});