const $ = _ => document.querySelector(_)
const $a = _ => document.querySelectorAll(_)

const process = async function() {
	const conf = {method: "GET"}
	let request, data, btcusd
	request = await fetch("http://cryptomarketplot.com/api.json", conf)
	//request = await fetch("/test_api.json", conf)
	data = await request.json()
	btcusd = data[0].price_usd
	
	let cardH4 = $a('.col.card h4')
	let cardP = $a('.col.card p')
	// BTC is always assume at 0, slice the next 10
	data.slice(1,11).forEach((item, i, array) => {
		cardH4[i*2+1].textContent = item.symbol
		cardP[i*2].textContent += item.price_btc
	
		let algoPrice = runAlgo(item.symbol, Number(btcusd))
		if (algoPrice >= 0) {
			cardP[i*2+1].textContent += algoPrice.toExponential(4)
		
			let diff = percentDiff(item.price_btc, algoPrice).toFixed(2)
			if (diff <= 0) {
				cardH4[i*2].parentNode.style.borderTop = "solid #9cf196"
				//$a('.col.card h7')[i].style.color = "#9cf196"
				if (diff <= -3){
				cardH4[i*2].parentNode.style.borderTop = "solid green"
				$a('.col.card h7')[i].textContent = "Grab!!"
				$a('.col.card h7')[i].style.color = "Green"					
				}
			} else if (diff >= 0) {
				cardH4[i*2].parentNode.style.borderTop = "solid #ffb6b9"
				//$a('.col.card h7')[i].style.color = "#ffb6b9"
				if (diff >= 3){
				cardH4[i*2].parentNode.style.borderTop = "solid red"
				$a('.col.card h7')[i].textContent = "Ditch!!"
				$a('.col.card h7')[i].style.color = "red"
				}
			}
			cardH4[i*2].textContent = diff +'%'
		} else {
			cardP[i*2+1].textContent += "Unavailable"
			cardH4[i*2].textContent = "None"
		}
	});
}

const runAlgo = function (symbol, price){
	let predicted
	let algo = Algos[symbol]
	if (typeof algo == "undefined") {
		return predicted =-1
	}
	return predicted=algo(price)
}

const Algos = {
	ETH : function (d) {
		let y = 0.0
		y = (((0.112774 + d) + ((0.112774 * 0.035685) - d)) + 0.112774)
		y += 0.160917
		y += ((((0.386812 / 0.350861) / (0.350861 * d)) / ((0.350861 - 0.386812) * 0.350861)) - 0.386812)
		y += 0.043325
		return y},
	 XRP : function (d) {
		let y = 0.0
		y = (((((0.187109 / d) / d) - d) + d) / 0.187109)
		y += d
		y += (d / (((0.249282 - d) / 0.249282) * ((d - d) - d)))
		y += ((d * (d - 0.490774)) / (0.490774 - d))
		return y},
	 BCH : function (d) {
		let y = 0.0
		y = 0.253441
		y += (0.576797 + ((0.576797 / (0.049732 + d)) * ((0.576797 + 0.576797) / 0.049732)))
		y += (0.661835 - (0.228096 + 0.228096))
		y += (((((d / 0.164506) - d) / (0.164506 * d)) - d) / d)
		return y},
	 BSV : function (d) {
		let y = 0.0
		y = 0.640969
		y += ((0.724466 / ((0.724466 + 0.724466) - 0.724466)) / (((0.724466 - d) / 0.929712) + d))
		y += ((0.878123 / (d + (0.202327 - 0.878123))) / ((0.202327 * 0.202327) * (0.878123 * 0.202327)))
		y += (d / ((0.302371 - ((0.302371 + 0.302371) * d)) + ((0.302371 - d) - (0.414391 / 0.302371))))
		return y},
	 LTC : function (d) {
		let y = 0.0
		y = ((((0.453963 / 0.453963) / (0.328444 * 0.328444)) * 0.328444) / (((d * 0.328444) / 0.453963) + 0.453963))
		y += 0.551018
		y += (d / (0.963683 - (0.963683 * (((0.963683 * 0.963683) * d) + (0.963683 - 0.419108)))))
		y += 0.572688
		return y},
	 EOS : function (d) {
		let y = 0.0
		y = ((((0.535047 * d) / 0.535047) - ((0.982994 + 0.982994) / (d * d))) + 0.535047)
		y += 0.335884
		y += (((0.154595 - (((d + 0.181291) / d) + 0.181291)) - d) / d)
		y += ((0.130999 - d) + (0.323294 / (d * ((0.323294 * 0.323294) - 0.130999))))
		return y},
	 BNB : function (d) {
		let y = 0.0
		y = (0.113927 - 0.399320)
		y += (0.245504 * (((((d * 0.467636) * 0.467636) - (d - 0.245504)) / d) + 0.467636))
		y += 0.363423
		y += (((d / (d * 0.588693)) + ((0.588693 / 0.422712) + 0.588693)) / (0.422712 * d))
		return y},
	 ETC : function (d) {
		let y = 0.0
		y = (((d - d) - (d - 0.966846)) / d)
		y += (d / (((d + 0.177098) * 0.177098) * ((0.177098 / 0.177098) + d)))
		y += ((((0.819241 - 0.819241) * 0.819241) + ((0.819241 + d) + 0.819241)) / d)
		return y},
	 XLM : function (d) {
		let y = 0.0
		y = (d + (((0.216347 - 0.216347) / d) - (d + d)))
		y += d
		y += (0.967481 * (0.060203 / d))
		return y},
	 XMR : function (d) {
		let y = 0.0
		y = ((0.143161 - (0.733690 * 0.143161)) * ((0.143161 / 0.733690) * (d / d)))
		y += ((((0.640749 - 0.640749) * d) - ((0.367967 / d) - 0.640749)) / d)
		y += ((0.543507 * (0.543507 - 0.269705)) / (d * (0.269705 * 0.269705)))
		return y},
	 TRX : function (d) {
		let y = 0.0
		y = ((((0.741269 * 0.741269) * (0.741269 - 0.741269)) * 0.741269) - d)
		y += ((((0.186656 * 0.186656) * d) / (d + d)) / (d - (0.186656 / 0.186656)))
		y += d
		return y},	
}
 
const percentDiff = function (current, predicted){
	return (current-predicted)/predicted * 100	
}

process();
