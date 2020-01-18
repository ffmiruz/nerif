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
		case 'ETC': 
			return predicted = ETC(price)
			break
		case 'XLM': 
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
	let y = 0.0
	y = 0.253441
	y += (0.576797 + ((0.576797 / (0.049732 + d)) * ((0.576797 + 0.576797) / 0.049732)))
	y += (0.661835 - (0.228096 + 0.228096))
	y += (((((d / 0.164506) - d) / (0.164506 * d)) - d) / d)
	return y
}
const BSV = function (d) {
	let y = 0.0
	y = 0.640969
	y += ((0.724466 / ((0.724466 + 0.724466) - 0.724466)) / (((0.724466 - d) / 0.929712) + d))
	y += ((0.878123 / (d + (0.202327 - 0.878123))) / ((0.202327 * 0.202327) * (0.878123 * 0.202327)))
	y += (d / ((0.302371 - ((0.302371 + 0.302371) * d)) + ((0.302371 - d) - (0.414391 / 0.302371))))
	return y
}
const LTC = function (d) {
	let y = 0.0
	y = ((((0.453963 / 0.453963) / (0.328444 * 0.328444)) * 0.328444) / (((d * 0.328444) / 0.453963) + 0.453963))
	y += 0.551018
	y += (d / (0.963683 - (0.963683 * (((0.963683 * 0.963683) * d) + (0.963683 - 0.419108)))))
	y += 0.572688
	return y
}
const EOS = function (d) {
	let y = 0.0
	y = ((((0.535047 * d) / 0.535047) - ((0.982994 + 0.982994) / (d * d))) + 0.535047)
	y += 0.335884
	y += (((0.154595 - (((d + 0.181291) / d) + 0.181291)) - d) / d)
	y += ((0.130999 - d) + (0.323294 / (d * ((0.323294 * 0.323294) - 0.130999))))
	return y
}
const BNB = function (d) {
	let y = 0.0
	y = (0.113927 - 0.399320)
	y += (0.245504 * (((((d * 0.467636) * 0.467636) - (d - 0.245504)) / d) + 0.467636))
	y += 0.363423
	y += (((d / (d * 0.588693)) + ((0.588693 / 0.422712) + 0.588693)) / (0.422712 * d))
	return y
}
const ETC = function (d) {
	return d / 2*1.9
}
const XLM = function (d) {
	let y = 0.0
	y = (d + (((0.216347 - 0.216347) / d) - (d + d)))
	y += d
	y += (0.967481 * (0.060203 / d))
	return y
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