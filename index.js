const express = require("express"),
	app = express(),
	HOST = "127.0.0.1",
	PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static("public"));

// Handles redirect from / and then renders the form for adjective
app.get("/first-word", (_, res) => {
	res.send(`
        <form action='/adjective'>
            <input name='adj' placeholder='Enter an adjective'>
            <button type='submit'>Go</button>
        </form>
    `);
});

// Catches query params off the form request
// Peek line 28. It's a special input type that doesn't show but allows us to pass values on (name, value attributes)
app.get("/adjective", (req, res) => {
	const { adj } = req.query
    res.send(`
        <form action='/noun'>
            <input name='noun' placeholder='Enter a noun'>
            <input type='hidden' name='adj' value='${adj}'>
            <button type='submit'>Go</button>
        </form>
    `);
});

// Line 36 catches carried over adj and new noun query params and turns them into string
// We again redirect to the story
app.get("/noun", (req, res) => {
    const queryParams = new URLSearchParams(req.query).toString()
    res.redirect(`/story/?${queryParams}`)
});

// We destructure adj and noun out of the query params and use them to render
app.get("/story", (req, res) => {
    const { adj, noun } = req.query
	res.send(`<h1>${adj} ${noun}</h1>`)
});

app.listen(PORT, HOST, () =>
	console.log(`[server] listening on ${HOST}:${PORT}`)
);
