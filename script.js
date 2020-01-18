const $ = _ => document.querySelector(_)
const $a = _ => document.querySelectorAll(_)

const process = async function() {
	//if( !arg ) return null;
	const conf = {method: "GET"}
	let request, data
	request = await fetch("http://cryptomarketplot.com/api.json", conf)
	//request = await fetch("/test_api.json", conf)
	data = await request.json().then(arr => arr.slice(1,11))

	// 
	data.forEach((item, i, array) => {
	$a('.col.card h4')[i*2+1].textContent = item.symbol
	$a('.col.card p')[i*2].textContent += item.price_btc

	let algoPrice = runAlgo(item.symbol, item.price_btc)
	if (algoPrice < 0) {
		$a('.col.card p')[i*2+1].textContent += "Unavailable"
		$a('.col.card h4')[i*2].textContent = "No results"
	} else {
	$a('.col.card p')[i*2+1].textContent += algoPrice.toExponential(4)
	$a('.col.card h4')[i*2].textContent = diff(item.price_btc, algoPrice).toFixed(2) +'%'
	}

	});

}

const runAlgo = function (symbol, price){
	let predicted
	switch(symbol) {
		case 'ETH': 
			return predicted = ETH(price)
			break
		case 'XRP': 
			return predicted = XRP(price)
			break
		case 'BCH': 
			return predicted = BCH(price)
			break
		case 'BSV': 
			return predicted = BSV(price)
			break
		case 'LTC': 
			return predicted = LTC(price)
			break
		case 'EOS': 
			return predicted = EOS(price)
			break
		case 'BNB': 
			return predicted = BNB(price)
			break
		case 'TRX': 
			return predicted = ETC(price)
			break
		case 'ETC': 
			return predicted = XLM(price)
			break
		case 'XMR': 
			return predicted = XMR(price)
			break
		default :
			predicted = pDefault()
			break
	}
	return predicted
}

const ETH = function (price) {
	return price / 2.2*1.9
}
const XRP = function (price) {
	return price * 2/1.5
}
const BCH = function (price) {
	return price * 2/1.9
}
const BSV = function (price) {
	return price * 2.1/1.2
}
const LTC = function (price) {
	return price / 1.3*1.8
}
const EOS = function (price) {
	return price * 2/1.4
}
const BNB = function (price) {
	return price * 2/1.1
}
const ETC = function (price) {
	return price / 2*1.9
}
const XLM = function (price) {
	return price * 2.3/1.9
}
const XMR = function (price) {
	return price * 2.1/1.3
}
const pDefault = function () {
	return  -1
}

const diff = function (current, predicted){
	return (current-predicted)/predicted	
}


process();