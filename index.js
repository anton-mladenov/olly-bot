var request = require("superagent")
var SlackBot = require('slackbots');

let time = `${new Date().getHours()}:${new Date().getMinutes()}`;

const bot = new SlackBot({
	token: process.env.BOT_ID || "xoxb-215618382279-404376298535-QAhcY9Uwox7Mn7SrG0HaRbj4",
	name: "Olly"
})

bot.on("start", () => {
	// const params = {
	// 	icon_emoji: ":penguin:"
	// }
	
	console.log(`Olly's server is running @ ${time}`)

	bot.postMessageToChannel(
		"bot-testing",
		"Olly is here for you!",
		// params
	)
})

bot.on("error", (err) => console.log(err))

bot.on("message", (data) => {
	if (data.type !== "message") {
		return;
	}
	handleMessage(data)
})

function handleMessage(data) {
	if (data.user === "U69RFSYHW") { console.log("	MESSAGE: ", data) }
	// console.log("	MESSAGE: ", data)
	if (data.text.includes(" hey")) {
		ollyHey(data.user)
	} else if (data.text.includes(" match")) {
		ollyMatch()
	} else if (data.text.includes(" intro")) {
		ollyIntro(data)
	}
}

function ollyHey(userId) {
	console.log("	 	")
	console.log("		Problematic DATA: 	" + userId)
	console.log("	 	")
	request
		.get(`http://localhost:4000/hey/${userId}`)
		.then(res => {
			request
				.post('https://hooks.slack.com/services/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')
				.set('Content-Type', 'application/json')
				.send( res.body.aboutMeButton )
				.catch(err => console.log("			ERROR FROM INSIDE REQUEST:   " + err));
			}
		)
		.catch(err => console.log("			ERROR FROM OUTSIDE REQUEST:   " + err))
}

function ollyIntro() {
	request
		.get(`http://localhost:4000/intro`)
		.then(res => {
			request
				.post('https://hooks.slack.com/services/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')
				.set('Content-Type', 'application/json')
				.send( { text: res.body.intro } )
				.catch(err => console.log("			ERROR FROM INSIDE REQUEST:   " + err));
			}
		)
		.catch(err => console.log("			ERROR FROM OUTSIDE REQUEST:   " + err))
}

function ollyMatch() {
	request
		.get("http://localhost:4000/test")
		.then(res => {
			request
				.post('https://hooks.slack.com/services/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')
				.set('Content-Type', 'application/json')
				.send(res.body.cats)
				.then()
		})
}











// function chuckJoke () {
// 	request
// 		.get("https://api.chucknorris.io/jokes/random")
// 		.then(res => {
// 			const joke = res.body.value
	
// 			// const params = {
// 			// 	icon_emoji: ":laughing:"
// 			// }

// 			bot.postMessageToChannel(
// 				"bot-testing",
// 				`Chuck Norris: ${joke}`,
// 				// params
// 			)
// 	})
// }

// function giphyFunc () {
// 	request
// 			.get("https://bot-back-end.herokuapp.com/giphy/batman")
// 			// .get("http://localhost:4000/giphy/duck")
// 			.then(res => {
// 				// const joke = res.body.data[0].id
// 				const joke = res.res.text
// 				console.log("here's your joke, bro: " + Object.keys(joke))
		
// 				// const params = {
// 				// 	icon_emoji: ":laughing:"
// 				// }

// 				bot.postMessageToChannel(
// 					"bot-testing",
// 					`Giphy: ${joke}`,
// 					// params
// 				)
// 			})
// 			.catch((err) => console.log(err))
// }