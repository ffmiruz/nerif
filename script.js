const $ = _ => document.querySelector(_)
const $a = _ => document.querySelectorAll(_)
let btcusd

const process = async function() {
	//if( !arg ) return null;
	const conf = {method: "GET"}
	let request, data
	//request = await fetch("http://cryptomarketplot.com/api.json", conf)
	request = await fetch("/test_api.json", conf)
	data = await request.json()
	btcusd = data[0].price_usd
	// 
	data.slice(1,11).forEach((item, i, array) => {
	$a('.col.card h4')[i*2+1].textContent = item.symbol
	$a('.col.card p')[i*2].textContent += item.price_btc

	let algoPrice = runAlgo(item.symbol, Number(btcusd))
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

const ETH = function (d) {
	let y = 0.0
	y = (((0.112774 + d) + ((0.112774 * 0.035685) - d)) + 0.112774)
	y += 0.160917
	y += ((((0.386812 / 0.350861) / (0.350861 * d)) / ((0.350861 - 0.386812) * 0.350861)) - 0.386812)
	y += 0.043325
	return y
}
const XRP = function (d) {
	let y = 0.0
	y = (((((0.187109 / d) / d) - d) + d) / 0.187109)
	y += d
	y += (d / (((0.249282 - d) / 0.249282) * ((d - d) - d)))
	y += ((d * (d - 0.490774)) / (0.490774 - d))
	return y
}
const BCH = function (d) {
	return d * 2/1.9
}
const BSV = function (d) {
	return d * 2.1/1.2
}
const LTC = function (d) {
	return d / 1.3*1.8
}
const EOS = function (d) {
	return d * 2/1.4
}
const BNB = function (d) {
	return d * 2/1.1
}
const ETC = function (d) {
	return d / 2*1.9
}
const XLM = function (d) {
	return d * 2.3/1.9
}
const XMR = function (d) {
	return d * 2.1/1.3
}
const pDefault = function () {
	return  -1
}

const diff = function (current, predicted){
	return (current-predicted)/predicted * 100	
}


process();