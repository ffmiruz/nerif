const $ = _ => document.querySelector(_)
const $a = _ => document.querySelectorAll(_)

const getPrices = async function() {
	//if( !arg ) return null;
	const conf = {method: "GET"}
	let request, data
	//request = await fetch("http://cryptomarketplot.com/api.json", conf)
	request = await fetch("/test_api.json", conf)
	data = await request.json().then(arr => arr.slice(1,11))

	// 
	data.forEach((item, i, array) => {
	$a('.col.card h4')[i*2+1].textContent = item.symbol
	$a('.col.card p')[i*2].textContent += item.price_btc
	let algoPrice = expected(item.price_btc)
	$a('.col.card p')[i*2+1].textContent += algoPrice.toExponential(4)
	$a('.col.card h4')[i*2].textContent = diff(item.price_btc, algoPrice).toFixed(2) +'%'
	});

}

const expected = function (arg){
	return arg * 2.9 / 2.8
}
const diff = function (current, predicted){
	return (current-predicted)/predicted
	
}
getPrices();