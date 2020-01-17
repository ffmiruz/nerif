const $ = _ => document.querySelector(_)
const $a = _ => document.querySelectorAll(_)

const getPrices = async function() {
	//if( !arg ) return null;
	const conf = {method: "GET"}
	let request, data
	//request = await fetch("http://cryptomarketplot.com/api.json", conf)
	request = await fetch("/test_api.json", conf)
	data = await request.json().then(arr => arr.slice(0,10))
	btc = data[0]
	current = btc.price_usd
	$('.col.card span').textContent = current
}
getPrices();